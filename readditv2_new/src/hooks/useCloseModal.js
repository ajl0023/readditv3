import { useState, useEffect, useContext, useRef } from "react";

export function useCloseModal(handler) {
  const modal = useRef();
  const closeModal = (e) => {
    if (!modal.current.contains(e.target)) {
      handler();
    }
  };
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return { modal, closeModal };
}
