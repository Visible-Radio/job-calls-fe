import { useEffect, useState } from "react";
import { ListStyles } from "./styles/styles";

export default function List({ filtered, addItem, addItemByKeypress, listIsOpen, searchString }) {
  const [ cursor, setCursor ] = useState(0);

  useEffect(()=> {
    setCursor(0);
  },[searchString])

  const handleMouseOver = (event) => {
    setCursor(Number(event.target.dataset.index));
  }

  const handleKeyDown = (event) => {
    if (![13, 38, 40].includes(Number(event.keyCode))) return;
    event.preventDefault();
    if (event.keyCode === 38 && cursor > 0) return setCursor(cursor - 1);
    if (event.keyCode === 40 && cursor < filtered.length - 1) return setCursor(cursor + 1);
    if (event.keyCode === 13 && filtered.length && cursor < filtered.length) {
      setCursor(cursor > 0 ? cursor - 1 : 0);
      addItemByKeypress(filtered[cursor]);
    }
  }

  useEffect(()=> {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  })

  return (
    <ListStyles listIsOpen={listIsOpen}>
      {
        filtered.map((option, i) => {
          return (
            <button
              className={cursor === i ? 'inputItem highlighted' : 'inputItem'}
              key={i + option}
              value={option}
              onClick={addItem}
              onMouseOver={handleMouseOver}
              data-index={i}
            >
              {option}
            </button>
          )
        })
      }
    </ListStyles>
  )
}