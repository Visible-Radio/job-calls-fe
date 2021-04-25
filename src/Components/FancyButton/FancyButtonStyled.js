import styled from "styled-components";

export const FancyButton = styled.button`

  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.75rem;
  align-self: start;
  border: none;
  font-size: 2.5rem;
  padding: 0;
  background-color: transparent;
  transition: all 0.2s;

  &::after, &::before {
    content: '';
    display: inline-block;
    background-color: ${props => props.color};
    position: absolute;
  }

  // horizontal
  &::after {
    top: 16px;
    left: 3px;
    width: 2rem;
    height: 0.4rem;
  }

  // vertical
  &::before {
    top: 3px;
    left: 16px;
    width: 0.4rem;
    height: 2rem;
    visibility: ${props => props.isOpen ? 'hidden' : 'visible'};
  }

  &:focus {
    outline: none;
  }

  &:hover {
    filter: brightness(1.5);
    background: none;
  }

`;