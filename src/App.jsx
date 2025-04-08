import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef("null");

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    // alert("Password copied to clipboard!");
  }, [password]);
  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, PasswordGenerator]);

  return (
    <div className="container">
      <h1>Password generator</h1>
      <div className="password-display">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}>Copy</button>
      </div>

      <div className="options">
        <div className="option">
          <label>Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="option">
          <label htmlFor="numberInput">Include Numbers</label>
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
        </div>

        <div className="option">
          <label htmlFor="characterInput">Include Special Characters</label>
          <input
            type="checkbox"
            id="characterInput"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
