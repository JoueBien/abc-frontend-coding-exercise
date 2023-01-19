// import React from "react";
// import { ResultsList } from "./components/ResultsList/ResultsList";
// import { Input } from "./components/Input/Input";
// import { Button } from "./components/Button/Button";
import "./App.css";
import { AutoCompleteSuburbInput } from "./components/AutoComplete/AutoCompleteSuburbInput/AutoCompleteSuburbInput";

// const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

export default function App() {
  return (
    <section>
      <AutoCompleteSuburbInput
        label="Suburb"
      />
      {/* TODO: Implement a suburb autocomplete using &lt;Input /&gt;,
      &lt;ResultsList /&gt; and &lt;Button /&gt; and data provided by the{" "}
      <a href="http://localhost:8010/proxy/suburbs.json?q=Syd">API</a>. */}
    </section>
  );
}
