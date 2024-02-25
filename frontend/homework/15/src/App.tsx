import { useEffect, useRef, useState } from "react";
import "./App.css";
import Timer from "./Timer";
import ScrollToTop from "./ScrollToTop";

function App() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  const inputElement = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  };

  useEffect(() => {
    inputElement.current?.focus();
  }, []);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <div className="form-element">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <h1>
          Render Count: {count.current}
        </h1>
      </div>
      <br></br>

      <div className="focus-input">
        <input type="text" ref={inputElement} />
        <button onClick={focusInput}>Focus Input</button>
      </div>
      <br></br>
      <div className="timer-div">
      <Timer></Timer>
      </div>
      <br></br>
      <ScrollToTop></ScrollToTop>
    </>
  );
}

export default App;
