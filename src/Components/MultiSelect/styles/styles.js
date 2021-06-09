import styled from "styled-components";

// OuterWrapper stores color variables for all subcomponents of MultiSelect
export const OuterWrapper = styled.div`
  --uiCol1: rgb(0,200,200);         // primary border, text hover
  --uiCol2: black;                  // primary text, background hover
  --uiCol3: #001320;                // main component background
  --uiCol4: #1f2138;                // button background

  /* Works on Firefox */
   * {
    scrollbar-width: thin;
    scrollbar-color: black transparent;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 0.625rem;
  }

  *::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.2);
    border-radius: 20px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--uiCol1);
    border-radius: 20px;
    border: 1px solid var(--uiCol2);
  }

  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 100%;
  margin-bottom: 0.5rem;
`;

export const MultiSelectOuterStyles = styled.div`
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  max-height: 100vh;
  border: 2px solid var(--uiCol1);
  border: 2px solid var(--uiCol1);
  background-color: var(--uiCol3);
  padding: 0;
  border-radius: 1rem;
  overflow: overlay;

  // very cool! select the parent based on child focus state
  &:focus-within {
    border-color: var(--uiCol1);
  }

  input {
    box-sizing: border-box;
    font-size: 1.125rem;
    color: var(--uiCol1);
    flex: auto;
    width: 60%;
    background-color: transparent;
    padding: 0 3px 0 3px;
    margin: 8px 0 3px 0;
    border: 1px solid var(--uiCol1);
    border: none;
    border-bottom: 2px solid transparent;
    &:focus {
      outline: none;
      border-bottom: 2px solid var(--uiCol1);
    }
    &:hover {
      background-color: transparent;
    }
    &::placeholder {
      color: var(--uiCol1);
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
    border-top: ${props => props.selectedOptions.length === 0 ? 'none' : '2px solid var(--uiCol1)'};
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
    border: 1px solid var(--uiCol1);
    border-radius: 1rem;
    color: var(--uiCol1);
    background-color: var(--uiCol4);
    transition: background-color 0.4s;

    &:hover {
      cursor: pointer;
      background-color: var(--uiCol1);
      color: var(--uiCol2);
    }
    &:focus {
      outline: 1px solid var(--uiCol1);
    }
  }

  .tagWrapper {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    height: ${props => props.height ? props.height + 'px' : '0px' };
    height: auto;
    max-height: 30vh;
    overflow-y: auto;
    width: 100%;
    padding: 0 1rem 0 1rem;
    transition: height, 0.2s;
    padding: 2px;
    border-radius: 1rem 1rem 0 0;
    z-index: 0;
  }
`;

export const TagStyles = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.itemColor || 'var(--uiCol1)'};
  border-bottom: 1px solid var(--uiCol3);
  border-left: 1px solid var(--uiCol3);
  color: var(--uiCol2);
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

  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3px;
    flex: none;
    font-size: 1.5rem;
    border: 1px solid var(--uiCol2);;
    border-radius: 1rem;
    height: 2rem;
    width: 2rem;
    background-color: transparent;
    transition: background-color 0.4s;
    &:hover {
      cursor: pointer;
      background-color: var(--uiCol2);;
      color: ${props => props.itemColor || 'var(--uiCol1)'};
    }
  }
`;