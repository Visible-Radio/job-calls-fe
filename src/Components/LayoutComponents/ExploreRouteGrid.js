import styled from "styled-components";

const ExploreRouteGridStyles = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: min-content 1fr 15px;
  max-width: 2000px;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  grid-gap: 0;
  overflow: hidden;
`;

export default function ExploreRouteGrid({ children }) {
  return (
    <ExploreRouteGridStyles>
      {children}
    </ExploreRouteGridStyles>
  )
}