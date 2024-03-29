import { TagStyles } from "./styles/styles";

export default function Tag({ option, removeItem, itemColor}) {
  return (
    <TagStyles itemColor={itemColor}>
      <span>{option}</span>
      <button onClick={removeItem} value={option} className="noFocus">×</button>
    </TagStyles>
  )
}