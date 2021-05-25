import styled from "styled-components"

const CallsViewStyles = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;

  display: grid;
  width: 100%;
  height: 100%;
  margin: 0;
  align-content: start;
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr;
  grid-auto-rows: auto;
  align-items: start;
  overflow-y: hidden;

`;

export default function CallsViewGrid({ children }) {
  return (
    <CallsViewStyles>
      {children}
    </CallsViewStyles>
  )
}