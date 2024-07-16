import { useEffect, useState } from "react";

function calculateEntropy(
  hasNumber: boolean,
  hasUpperCase: boolean,
  hasLowerCase: boolean,
  hasSpecialChar: boolean,
  inputValue: any
) {
  let rangeOfCharacters: number = 0;
  // only has lower case letters
  if (hasLowerCase === true) {
    rangeOfCharacters += 26;
  }

  // Only has upper case letters
  if (hasUpperCase === true) {
    rangeOfCharacters += 26;
  }

  // only has numbers
  if (hasNumber === true) {
    rangeOfCharacters += 10;
  }

  // Only has symbols
  if (hasSpecialChar === true) {
    rangeOfCharacters += 32;
  }

  let passwordEntropy: number =
    Math.round(
      Math.log2(Math.pow(rangeOfCharacters, inputValue.length)) * 100
    ) / 100;

  return passwordEntropy;
}

function App() {
  // useState that give us the input value
  const [inputValue, setInputValue] = useState("");
  // useStates that check what the string contains
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  // useState that sets password strength based on calculated entropy
  const [strength, setStrength] = useState("No Password");
  const [inputBackgroundColor, setInputBackgroundColor] = useState("#9ca3af");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setHasNumber(/\d/.test(inputValue));
    setHasUpperCase(/[A-Z]/.test(inputValue));
    setHasLowerCase(/[a-z]/.test(inputValue));
    setHasSpecialChar(
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(inputValue)
    );

    // Calculating password entropy

    let entropy: number = calculateEntropy(
      hasNumber,
      hasUpperCase,
      hasLowerCase,
      hasSpecialChar,
      inputValue
    );

    if (inputValue.length > 0) {
      if (entropy > 0 && entropy < 35) {
        setStrength("Very weak password");
        setInputBackgroundColor("#dc2626");
      } else if (entropy > 35 && entropy < 59) {
        setStrength("Weak password");
        setInputBackgroundColor("#dc2626");
      } else if (entropy > 59 && entropy < 119) {
        setStrength("Strong password");
        setInputBackgroundColor("#16a34a");
      } else if (entropy > 119) {
        setStrength("Very strong password");
        setInputBackgroundColor("#16a34a");
      }
    } else {
      setStrength("No Password");
      setInputBackgroundColor("#9ca3af");
    }
  }, [inputValue, hasNumber, hasUpperCase, hasLowerCase, hasSpecialChar]);

  return (
    <div className="App">
      <div className="input-deco">
        <div
          className="input"
          style={{ backgroundColor: inputBackgroundColor }}
        >
          <input
            type="password"
            placeholder="Type your password"
            value={inputValue}
            onChange={handleInputChange}
          />
          <p>{strength}</p>
        </div>
      </div>
      <label>
        <span>Number of characters: {inputValue.length}</span>
        <span style={{ color: hasUpperCase ? "#16a34a" : "#9ca3af" }}>
          Upper case letter
        </span>{" "}
        <span style={{ color: hasLowerCase ? "#16a34a" : "#9ca3af" }}>
          Lower case letter
        </span>{" "}
        <span style={{ color: hasNumber ? "#16a34a" : "#9ca3af" }}>
          Numbers
        </span>{" "}
        <span style={{ color: hasSpecialChar ? "#16a34a" : "#9ca3af" }}>
          Symbols
        </span>
      </label>
    </div>
  );
}

export default App;
