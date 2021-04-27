import styled from "styled-components";

const GraphViewSubGridStyles = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 4;

  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  padding: 0 5px 5px 5px;

  @media screen and (max-width: 840px) {
    grid-column: 1 / 4;
    grid-row: 4 / 5;
  }
`;

export default function GraphViewSubGrid({ children }) {
  return (
    <GraphViewSubGridStyles>
      {children}
    </GraphViewSubGridStyles>
  )
}