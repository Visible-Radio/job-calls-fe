import styled from "styled-components";

export const ListItemStyles = styled.button`
    display: flex;
    justify-items: flex-start;
    align-items: center;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border: none;
    color: var(--uiCol2);
    background-color: var(--uiCol1);

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
        background-color: ${props => props.itemColor};
      }

    }

    &:hover {
      cursor: pointer;
      color: var(--uiCol1);
      background-color: var(--uiCol2);
    }

    &:focus {
      outline: none;
      color: var(--uiCol1);
      background-color: var(--uiCol2);

    @media screen and (max-width: 420px) {
      &:focus {
        color: var(--uiCol2);
        background-color: var(--uiCol1);
      }
    }

`;

