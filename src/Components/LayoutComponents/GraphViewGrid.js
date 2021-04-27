import styled from "styled-components";

const GraphViewGridStyles = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;

  width: 100%;
  height: 100%;
  display: grid;
  margin: 0;
  grid-template-columns: 280px 1fr 0px 10px;
  grid-template-rows: auto auto auto;
  align-content: start;
  align-items: start;
  overflow-y: auto;
`;

export default function GraphViewGrid({ children }) {
  return (
    <GraphViewGridStyles>
      {children}
    </GraphViewGridStyles>
  )
}