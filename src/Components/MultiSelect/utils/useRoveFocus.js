/*
Great tutorial here on roving focus, and adding refs to each item in a list
https://dev.to/rafi993/roving-focus-in-react-with-custom-hooks-1ln
 */

import { useCallback, useEffect, useState } from "react";

export default function useRoveFocus(arrLength, textInputRef) {
  const [ currentFocus, setCurrentFocus] = useState(-1);

  const handleKeyDown = useCallback(event => {
    if (event.keyCode === 40) {
      // Down arrow
      event.preventDefault();
      if (document.activeElement !== textInputRef.current) {
        setCurrentFocus(currentFocus === arrLength - 1 ? 0 : currentFocus + 1);
      } else if (document.activeElement === textInputRef.current) {
        setCurrentFocus(0);
      }
    } else if (event.keyCode === 38) {
      // Up arrow
      event.preventDefault();
      setCurrentFocus(currentFocus === 0 ? arrLength - 1 : currentFocus - 1);
    }
  }, [arrLength, currentFocus, setCurrentFocus, textInputRef]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
}