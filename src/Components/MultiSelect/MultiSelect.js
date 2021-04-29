import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MultiSelectOuterStyles = styled.div`
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  max-height: 100vh;
  border: 2px solid var(--greyCyan);
  background-color: transparent;
  padding: 0;
  border-radius: 1rem;

  // very cool! select the parent based on child focus state
  &:focus-within {
    border-color: var(--greyCyan);
  }

  input {
    box-sizing: border-box;
    font-size: 1.5rem;
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
    width: 2rem;
    height: 2rem;
    margin-right: 4px;
    font-size: 1.5rem;
    border: 1px solid var(--greyCyan);;
    border-radius: 1rem;
    color: var(--greyCyan);
    background-color: transparent;
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
    max-height: 60vh;
    overflow-y: scroll;
    width: 100%;
    padding: 0 1rem 0 1rem;
    transition: height, 0.2s;
    padding: 2px;
    border-radius: 1rem 1rem 0 0;
  }
`;

const OutterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  max-width: 100%;
`;

const TagStyles = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--greyCyan);
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  font-size: 0.75rem;
  border-radius: 1rem;
  height: auto;
  width: auto;
  transition: opacity, max-height, max-width 0.5s ease-out;

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
      color: var(--greyCyan);
    }
  }
`;

function Tag({ option, removeItem}) {
  return (
    <TagStyles>
      <span>{option}</span>
      <button onClick={removeItem} value={option} className="noFocus">×</button>
    </TagStyles>
  )
}

const MultiSelectListStyles = styled.div`
  top: 100%;
  position: absolute;
  margin: 8px 0 0 0;
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 0;
  border-radius: 1rem;
  transition: border-color 0.4s;
  overflow-y: scroll;
  max-height: ${props => props.listIsOpen ? '50vh' : '0vh'};

  background-color: var(--greyCyan);
  transition: max-height 0.2s;


  .inputItem {
    text-align: left;
    color: black;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border: none;
    background-color: var(--greyCyan);

    &:focus {
      outline: none;
    }
  }
  .highlighted {
    color: var(--greyCyan);
    background-color: black;
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
`;

export default function MultiSelect({ companiesOnRecord }) {
  const textInput = useRef(null);
  const tagWrapper = useRef(null);

  const companyOptions = ["ADVANCED CON IND LTD", "AECON EPSCA", "AECON INDUSTRIAL", "AINSWORTH INC.", "AINSWORTH POWER CONSTRUCTION INC", "ALLTRADE INDUSTRIAL CONTRACTORS", "AMBIENT MECHANICAL LTD", "AMP POWER LIMITED", "ARC BROTHERS ELECTRIC LTD.", "AVA ELECTRIC INC", "BASEVIEW ELECTRIC INC.", "BC NORTH", "BEACON UTILITY CONTRACTORS LIMIT", "BERMIS ELECTRIC INC.", "BIRNIE ELECTRIC LIMITED", "BLACK & MCDONALD EPSCA", "BLACK & MCDONALD LIMITED"];
  const [ options, setOptions ] = useState(companiesOnRecord || []);
  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ searchString, setSearchString ] = useState('');
  const [ listIsOpen, setListIsOpen ] = useState(true);

  useEffect(()=> {
    window.addEventListener('keydown', removeItemByKeyPress);
    return () => {
      window.removeEventListener('keydown', removeItemByKeyPress);
    }
  });

  useEffect(() => {
    setOptions(companiesOnRecord || [])
  },[companiesOnRecord])

  const focusChildOnParentClick = (event) => {
    if (event.target.classList.contains('noFocus')) return;
    textInput.current.focus();
  }

  const handleTextInputChange = (event) => {
    setSearchString(event.target.value)
    setListIsOpen(true);
  }

  const addItem = (event) => {
    setSelectedOptions([...selectedOptions, event.target.value])
    setOptions([...options].filter(option => option !== event.target.value));
  }

  const addItemByKeypress = (item) => {
    setSelectedOptions([...selectedOptions, item])
    setOptions([...options].filter(option => option !== item));
  }

  const removeItem = (event) => {
    setOptions([...options, event.target.value]);
    setSelectedOptions([...selectedOptions].filter(option => option !== event.target.value));
  }

  const removeItemByKeyPress = (event) => {
    if (event.keyCode !== 8 || selectedOptions.length < 1 || searchString.length) return;
    const deleted = [...selectedOptions].pop();
    setSelectedOptions([...selectedOptions].filter(option => option !== deleted));
    setOptions([...options, deleted].sort());
  }

  const clearInput = () => {
    if (searchString.length) setSearchString('');
  }

  const toggleList = () => {
    setListIsOpen(!listIsOpen);
  }

  const filtered = options.filter(option => option.toLowerCase().includes(searchString.toLowerCase()));
  return (
    <OutterWrapper>

      <MultiSelectOuterStyles onClick={focusChildOnParentClick} selectedOptions={selectedOptions}>
        <div className="tagWrapper" ref={tagWrapper}>
        {
          selectedOptions.map((option, i) => {
            return <Tag key={i+option} option={option} removeItem={removeItem}/>
          })
        }
        </div>
        <div className="inputWrapper">
          <input placeholder="Search Companies" type="text" ref={textInput} onChange={handleTextInputChange} value={searchString}></input>
          <button className="control" onClick={clearInput}>×</button>
          <button className="control noFocus" onClick={toggleList}>{listIsOpen ? '▲' : '▼'}</button>
        </div>
      </MultiSelectOuterStyles>

      <List
        filtered={filtered}
        addItem={addItem}
        addItemByKeypress={addItemByKeypress}
        listIsOpen={listIsOpen}
        searchString={searchString}
      />

    </OutterWrapper>
  )
}

function List({ filtered, addItem, addItemByKeypress, listIsOpen, searchString }) {
  const [ cursor, setCursor ] = useState(0);

  useEffect(()=> {
    setCursor(0);
  },[searchString])

  const handleMouseOver = (event) => {
    setCursor(Number(event.target.dataset.index));
  }

  const handleKeyDown = (event) => {
    if (![13, 38, 40].includes(Number(event.keyCode))) return;
    event.preventDefault();
    if (event.keyCode === 38 && cursor > 0) return setCursor(cursor - 1);
    if (event.keyCode === 40 && cursor < filtered.length - 1) return setCursor(cursor + 1);
    if (event.keyCode === 13 && filtered.length && cursor < filtered.length) {
      setCursor(cursor > 0 ? cursor - 1 : 0);
      addItemByKeypress(filtered[cursor]);
    }
  }

  useEffect(()=> {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  })

  return (
    <MultiSelectListStyles listIsOpen={listIsOpen}>
      {
        filtered.map((option, i) => {
          return (
            <button
              className={cursor === i ? 'inputItem highlighted' : 'inputItem'}
              key={i + option}
              value={option}
              onClick={addItem}
              onMouseOver={handleMouseOver}
              data-index={i}
            >
              {option}
            </button>
          )
        })
      }
    </MultiSelectListStyles>
  )
}