// Libs
import { FC, useRef, useEffect, useState } from "react";
import { useAsyncSetState, useGetState } from "use-async-setstate";
import { v4 as uuidv4 } from "uuid";
// Comps
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import { ResultsList } from "../../ResultsList/ResultsList";
import { SuburbEntity } from "../../../types/postCodeApi";
import { useDebouncedCallback } from "use-debounce";
import { API } from "../../../utils/api";

// Styles
import "./AutoCompleteSuburbInput.scss";
import { API_SAMPLE } from "../../../stubs/apiSample";

// Props
export type Props = {
  label?: string;
  name?: string;
  className?: string;
};

export const AutoCompleteSuburbInput: FC<Props> = ({
  label,
  className,
  name,
}) => {
  // Local State
  const [idString] = useState(uuidv4());
  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useAsyncSetState<boolean>(false);
  const [results, setResults] = useAsyncSetState<SuburbEntity[]>([
    ...API_SAMPLE,
  ]);
  const [inputValue, setInputValue] = useAsyncSetState<string>("");
  const [selectedValue, setSelectedValue] = useAsyncSetState<
    SuburbEntity | undefined
  >(undefined);
  const getResults = useGetState(results);

  // Functions
  // As the user types get results
  // Should only match if entire string is partial at index 0
  const onTypeChangeSearch = useDebouncedCallback(async (value: string) => {
    // If the value is good process it
    // Else don't and clear the list
    const cleanValue = value.trim();
    if (cleanValue.length > 0) {
      try {
        const params = API.jsonToParams({
          q: value,
        });
        console.log("params", params);
        // This would be less jank with next.js and an API route.
        const res = await API.get<SuburbEntity[]>(
          `http://localhost:8010/proxy/suburbs.json?${params}`
        );
        const newResults = res.data?.filter((item) => {
          return (
            item.name
              .toLocaleLowerCase()
              .indexOf(cleanValue.toLocaleLowerCase()) === 0
          );
        });
        console.log("res", res);
        setResults([...(newResults || [])]);
      } catch (e) {
        // Todo: handle on error
        // Should see design/lead dev on how to handle so things are consistent
        console.warn(
          "@AutoCompleteSuburbInput->onTypeChangeSearch Failed with",
          e
        );
      }
    } else {
      setResults([]);
    }
  }, 250);

  // Keep Value in sync and call search
  async function onTypeChange(value: string) {
    setInputValue(value);
    // Ask designer if searching should clear the selection
    // setSelectedValue(undefined)
    onTypeChangeSearch(value);
  }

  // When the user chooses and item update the value
  function setValueOnSelect(value: SuburbEntity) {
    // Check in with design/product on what is considered "full name of the suburb"
    setInputValue(value.name);
    setSelectedValue(value);
  }

  // When the user clicks the button show the alert box
  function onChosen() {
    if (selectedValue?.name) {
      alert(`The last sub selection was "${selectedValue?.name}".`);
    } else {
      alert(`No selection has been made.`);
    }
  }

  // On Mount
  // Continue searching for focus/hover of children
  useEffect(() => {
    const intervalRef = setInterval(() => {
      if (inputContainerRef) {
        const childFocusElements = Array.from(
          inputContainerRef.current?.querySelectorAll(":focus, ul:hover") || []
        );
        setIsOpen(
          childFocusElements.length > 0 &&
            getResults().length > 0
        );
      }
    }, 100);
    return () => {
      clearInterval(intervalRef);
    };
  });

  // ..
  return (
    <div className={`AutoCompleteSuburbInput ${className}`}>
      <div className="input-container">
        {label !== undefined && (
          <>
            <label className="input-label" htmlFor={idString}>
              {label}
            </label>
          </>
        )}
        <div className="input-results-container" ref={inputContainerRef}>
          {/* Order of tab cursor will go Input, ResultsList, Button */}
          <Input
            id={idString}
            name={name}
            value={inputValue}
            placeholder="Find and choose your suburb."
            onInput={onTypeChange}
            aria-invalid={selectedValue === undefined}
          />
          {isOpen === true && (
            <>
              <ResultsList
                id={idString}
                className="input-results"
                items={results}
                selected={selectedValue}
                onSelect={setValueOnSelect}
              />
            </>
          )}
        </div>
        <Button
            className="submit-button"
            type="button"
            alt="Check Chosen Suburb"
            onClick={onChosen}
          />
      </div>
    </div>
  );
};
