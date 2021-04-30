import styled from "styled-components";

export const ListItemStyles = styled.button`
    display: flex;
    justify-items: flex-start;
    align-items: center;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border: none;
    color: black;
    background-color: var(--greyCyan);

    div {
      text-align: left;
      min-width: 75px;

      span {
        display: block;
        text-align: center;
        padding: 5px;
        min-width: 25px;
        border-radius: 1rem;
        margin-right: 1rem;
        background-color: ${props => props.color}
      }

    }

    &:hover {
      cursor: pointer;
      color: var(--greyCyan);
      background-color: black;
    }

    &:focus {
      outline: none;
      color: var(--greyCyan);
      background-color: black;

    @media screen and (max-width: 420px) {
      &:focus {
        color: black;
        background-color: var(--greyCyan);
      }
    }

`;

