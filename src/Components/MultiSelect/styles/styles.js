import styled from "styled-components";

export const MultiSelectOuterStyles = styled.div`
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  max-height: 100vh;
  border: 2px solid var(--greyCyan);
  background-color: var(--lightBlack);;
  padding: 0;
  border-radius: 1rem;

  // very cool! select the parent based on child focus state
  &:focus-within {
    border-color: var(--greyCyan);
  }

  input {
    box-sizing: border-box;
    font-size: 1.125rem;
    color: var(--greyCyan);
    flex: auto;
    width: 60%;
    background-color: transparent;
    padding: 0 3px 0 3px;
    margin: 8px 0 3px 0;
    border: 1px solid var(--greyCyan);
    border: none;
    border-bottom: 2px solid transparent;
    &:focus {
      outline: none;
      border-bottom: 2px solid var(--greyCyan);
    }
    &:hover {
      background-color: transparent;
    }
    &::placeholder {
      color: var(--greyCyan);
      opacity: 0.4;
    }
  }
  .inputWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: auto;
    min-width: 50%;
    max-width: 100%;
    padding: 0 0.5rem 0 0.5rem;
    border-top: ${props => props.selectedOptions.length === 0 ? 'none' : '2px solid var(--greyCyan)'};
  }

  .control {
    width: min-content;
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 4px;
    font-size: 1.5rem;
    border: 1px solid var(--greyCyan);
    border-radius: 1rem;
    color: var(--greyCyan);
    background-color: var(--gradient2);
    transition: background-color 0.4s;

    &:hover {
      cursor: pointer;
      background-color: var(--greyCyan);
      color: black;
    }
    &:focus {
      background-color: var(--greyCyan);
      color: black;
      outline: 1px solid var(--greyCyan);
    }
  }

  .tagWrapper {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    height: ${props => props.height ? props.height + 'px' : '0px' };
    height: auto;
    max-height: 30vh;
    overflow-y: scroll;
    width: 100%;
    padding: 0 1rem 0 1rem;
    transition: height, 0.2s;
    padding: 2px;
    border-radius: 1rem 1rem 0 0;
    z-index: 0;
  }
`;

export const OutterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 100%;
  margin-bottom: 0.5rem;
`;


export const TagStyles = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.color || 'var(--greyCyan)'};
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  font-size: 0.75rem;
  border-radius: 1rem;
  height: auto;
  width: auto;
  transition: opacity, max-height, max-width 0.5s ease-out;
  z-index: 0;

  span {
    margin: 4px;
    padding: 8px;
    display: flex;
    align-items: center;
  }

  button {
    margin: 3px;
    flex: none;
    font-size: 1.5rem;
    border: 1px solid black;
    border-radius: 1rem;
    height: 2rem;
    width: 2rem;
    background-color: transparent;
    transition: background-color 0.4s;
    &:hover {
      cursor: pointer;
      background-color: black;
      color: ${props => props.color || 'var(--greyCyan)'};
    }
  }
`;