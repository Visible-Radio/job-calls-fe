import { TagStyles } from "./styles/styles";

export default function Tag({ option, removeItem, color}) {
  return (
    <TagStyles color={color}>
      <span>{option}</span>
      <button onClick={removeItem} value={option} className="noFocus">×</button>
    </TagStyles>
  )
}