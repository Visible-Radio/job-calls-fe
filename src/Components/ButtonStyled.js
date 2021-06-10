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
    background-color: var(--lightBlack);
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

// margin-left: auto;
export const MenuButtonStyled = styled.button`
    width: min-content;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    margin: 4px;
    font-size: 1.25rem;
    border: 2px solid var(--greyCyan);;
    border-radius: 2.5rem;
    color: var(--greyCyan);
    background-color: var(--lightBlack);
    transition: background-color 0.4s;
    padding: 0;

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
    span {
      margin: 0;
      padding: 0;
    }

`;
