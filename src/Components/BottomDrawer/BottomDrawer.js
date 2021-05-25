import { useState } from "react";
import styled from "styled-components";

const DrawerWrapper = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 4;
  position: relative;
  width: 100%;

  @media screen and (max-width: 840px) {
    grid-column: 1 / 4;
    grid-row: 4 / 5;
    border-top: 3px solid var(--magenta);
  }
`;

const Drawer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  width: 100%;
  height: ${props => props.isOpen ? '285px' : '0px'};
  overflow: ${props => props.isOpen ? '' : 'hidden'};
	transition: height 0.5s;
  border-top: none;

  @media screen and (min-width: 841px) {
    overflow: visible;
  }
`;

const DoughnutHandleStyles = styled.div`
  display: none;
  position: absolute;
  background-color: var(--magenta);
  color: var(--brightMagenta);
  padding: 0;
  top: -42px;
  height: 40px;
  width: 40px;
  left: calc(100% - 42px);
  border-radius: 50%;
  transition: background-color, transform 0.2s;
  ${props => props.isOpen ? '' : 'transform: translateY(-200%);'}
  z-index: 3;

  &:hover {
    color: var(--magenta);
    background-color: var(--brightMagenta);
  }

  @media screen and (max-width: 840px) {
      display: flex;
      justify-content: center;
      align-items: center;
  }
`;

export default function BottomDrawer({ children }) {
  const [ isOpen, setIsOpen ] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <DrawerWrapper>
      <Drawer isOpen={isOpen}>
        {children}
      </Drawer>
      <DoughnutHandleStyles id="doughnutHandle" onClick={handleClick} isOpen={isOpen}>
      ☰
      </DoughnutHandleStyles>
    </DrawerWrapper>
  )
}