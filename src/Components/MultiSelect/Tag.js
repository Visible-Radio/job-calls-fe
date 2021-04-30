import { TagStyles } from "./styles/styles";

export default function Tag({ option, removeItem}) {
  return (
    <TagStyles>
      <span>{option}</span>
      <button onClick={removeItem} value={option} className="noFocus">×</button>
    </TagStyles>
  )
}