import styled from "styled-components";

export const ButtonStyled = styled.button`
  width: min-content;
    display: flex;
    min-width: 160px;
    align-items: center;
    justify-content: center;
    width: max-content;
    height: 1.5rem;
    margin: 4px;
    font-size: 1rem;
    border: 2px solid var(--greyCyan);;
    border-radius: 1rem;
    color: var(--greyCyan);
    background-color: transparent;
    transition: background-color 0.4s;
    padding: 1rem;

    &:hover {
      cursor: pointer;
      background-color: var(--greyCyan);
      color: black;
    }
    &:focus {
      background-color: var(--greyCyan);
      color: black;
      outline: 1px solid var(--greyCyan);
    }
    &:active {
      transform: scale(0.97);
    }
`;
