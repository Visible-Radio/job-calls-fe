import { useState } from "react";
import styled from "styled-components";

const Drawer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 4;

  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  width: 100%;
  height: auto;
  height: 285px;
  height: ${props => props.isOpen ? '285px' : '0px'};
  padding: 0 5px 5px 5px;
	transition: height 0.5s;
  border-top: none;

  #doughnutHandle {
    display: none;
    position: absolute;
    background-color: var(--magenta);
    color: var(--brightMagenta);
    top: -100px;
    height: 40px;
    width: 40px;
    left: 0;
    border-radius: 50%;
    transition: background-color 0.2s;
    z-index: 1;

    &:hover {
      color: var(--magenta);
      background-color: var(--brightMagenta);
    }
  }

  @media screen and (max-width: 840px) {
    grid-column: 1 / 4;
    grid-row: 4 / 5;

    border-top: 3px solid var(--magenta);

    #doughnutHandle {
      display: inline-block;
      left: 90%;
    }
  }
`;

export default function BottomDrawer({ children }) {
  const [ isOpen, setIsOpen ] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Drawer isOpen={isOpen}>
      <button id="doughnutHandle" onClick={handleClick}>
      ☰
      </button>
      {children}
    </Drawer>
  )
}