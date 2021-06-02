import styled from "styled-components";

export const ListStyles = styled.div`
  top: 100%;
  position: absolute;
  margin: 8px 0 0 0;
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 0;
  border-radius: 1rem;
  overflow-y: scroll;
  max-height: ${props => props.listIsOpen ? '40vh' : '0vh'};
  background-color: var(--greyCyan);
  transition: max-height 0.2s;
  z-index: 2;

  scrollbar-color: black transparent;

  &::-webkit-scrollbar-track {
    background: var(--lightBlack);
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--greyCyan);
    border-radius: 20px;
    border: 1px solid black;
  }

  &:hover {
    cursor: pointer;
  }

`;