import { useEffect, useRef } from "react";
import { ListItemStyles } from "./styles/ListItemStyles";

export default function ListItem({ filtered, option, addItem, longOption, itemColor, setFocus, focus, index}) {
const ref = useRef(null);
const handleClick = (event) => {
  // setting focus to that element when it is selected
  setFocus(index);
  addItem(event);
  // if we just removed an item from the bottom of the options list
  if (index === filtered.length - 1) setFocus(index - 1);
}

useEffect(() => {
  if (focus) ref.current.focus();
}, [focus])

  return (
    <ListItemStyles
      className="inputItem"
      data-value={option}
      onClick={addItem === null ? null : handleClick}
      itemColor={itemColor}
      ref={ref}
      tabIndex={focus ? 0 : -1}
    >
      <div data-value={option}>
        <span data-value={option} className="colorPatch">{option}</span>
      </div>
      <em data-value={option}>{longOption}</em>
    </ListItemStyles>
  )
}

