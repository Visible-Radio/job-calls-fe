import styled from "styled-components";
import ExploreRoute from "./ExploreRoute";

const AppStyles = styled.div`
  position: relative;

  .MainNav {
    right: 0;
    top: 25px;
    position: absolute;
    height: 40px;
    width: 30px;
    background-color: var(--greyCyan);
    z-index: 3;
    border-radius: 5px 0 0 5px;
  }

`;

export default function App() {
  return (
    <AppStyles>
      <nav>
      <button className="MainNav"></button>
      </nav>
      <ExploreRoute />
    </AppStyles>
  )
}