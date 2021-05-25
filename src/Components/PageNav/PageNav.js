import styled from "styled-components";

const PageNavStyles = styled.nav`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  border-top: 2px solid var(--myGrey);
  font-size: var(--fz);
  margin-bottom: 50px;
  margin-top: 1rem;

  div.pageReference {
    width: var(--buttonWidth);
    color: var(--greyCyan);
    display: flex;
    justify-content: center;
    order: var(--orderAssignEnd);
    width: var(--assignWidth100);
  }

  span {
    min-width: max-content;
  }
`;

const ButtonStyles = styled.button`
  border: 2px solid var(--greyCyan);
  color: var(--greyCyan);
  background-color: var(--lightBlack);
  font-size: var(--fz);
  font-family: 'Raleway', sans-serif;
  height: 44px;
  width: var(--buttonWidth);
  margin: var(--buttonMargin);
  border-radius: var(--borad);
  transition: all 0.25s;
  box-shadow: var(--boxShadow);

  &:disabled {
    filter: brightness(0.25);
  }

  &:hover:not(:disabled) {
    cursor: pointer;
    background-color: var(--greyCyan);
    color: var(--lightBlack);
  }

  &:focus {
    outline: 2px solid var(--textCol);
    outline-offset: 2px;
  }

  &:active {
    ${props => props.offset ? 'transform: translateY(20%);' : 'transform: translateY(10%);'};
  }
`;

const PageNav = ({ pageJump, changePage, currentPage, pageCount }) => {
  return (
    <PageNavStyles>
      <ButtonStyles
        offset={"true"}
        value={"start"}
        onClick={pageJump}
        disabled={currentPage === 0 && true}
      >
        First
      </ButtonStyles>
      <ButtonStyles
        offset={"true"}
        value={-1}
        onClick={changePage}
        disabled={currentPage === 0 && true}
      >
        Previous
      </ButtonStyles>
      <div className="pageReference">
        <span>
          Page {currentPage + 1} of {pageCount}
        </span>
      </div>
      <ButtonStyles
        offset={"true"}
        value={1}
        onClick={changePage}
        disabled={currentPage === pageCount - 1 && true}
      >
        Next
      </ButtonStyles>
      <ButtonStyles
        offset={"true"}
        value={"end"}
        onClick={pageJump}
        disabled={currentPage === pageCount - 1 && true}
      >
        Last
      </ButtonStyles>
    </PageNavStyles>
  );
};
export default PageNav;
