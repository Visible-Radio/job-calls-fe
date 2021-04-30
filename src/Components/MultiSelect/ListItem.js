import { ListItemStyles } from "./styles/ListItemStyles";

export default function ListItem({ option, addItem, longOption, color}) {

  return (
    <ListItemStyles
      className="inputItem"
      data-value={option}
      onClick={addItem}
      color={color}
    >
      <div data-value={option}>
        <span data-value={option} className="colorPatch">{option}</span>
      </div>
      <em data-value={option}>{longOption}</em>
    </ListItemStyles>
  )
}

