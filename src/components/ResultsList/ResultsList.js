// Libs
import { clsx } from "clsx";
// Comps
import { entitiesMatch } from "../../utils/entities";
// Styles
import "./ResultsList.css";

/**
 * <ResultsList
 *   items={[...]}
 *   onSelect={item => console.log(item.name)}
 *   className="MyResultsList"
 * />
 *
 * @prop {String} id the id to reference for accessability
 * @prop {Array} items List of results of form { name: string, state: { abbreviation: string } }
 * @prop {Object} selected List of results of form { name: string, state: { abbreviation: string } }
 * @prop {Function} onSelect Callback to execute when item is selected, accepts object.
 * @prop {mixed} ... All other props will be forwarded to the container DOM node.
 */
export function ResultsList(props) {
  // Props
  const { className, id, onSelect, items, selected, ...otherProps } = props;

  // ..
  return (
    <ul
      className={"ResultsList " + (className || "")}
      {...otherProps}
      aria-label="submenu"
      role="menu"
      aria-labelledby={id}
    >
      {(items || []).map(function (item, index) {
        const isSelected = entitiesMatch(item, selected || {});

        // ..
        return (
          <li
            key={"item" + index}
            className="ResultsList-item"
            role="menuitem"
            onClick={() => onSelect && onSelect(item)}
          >
            <button
              className={clsx(
                "ResultsList-button",
                isSelected ? "ResultsList-button-selected" : ""
              )}
              type="button"
              data-option={item.name}
              role="option"
              aria-selected={isSelected}
            >
              {item.name}, {item.state.abbreviation}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
