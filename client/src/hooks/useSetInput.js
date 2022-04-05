import axios from "axios";
import { useState, useEffect, useContext } from "react";

export function useSetInput() {
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return { input, handleChange };
}
