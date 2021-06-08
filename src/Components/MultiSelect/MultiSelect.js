import { useCallback, useEffect, useRef, useState } from "react";
import List from "./List";
import { MultiSelectOuterStyles, OuterWrapper } from "./styles/styles";
import Tag from "./Tag";

export default function MultiSelect({ optionsArray, selectedOptionsArray=[], longOptions, itemColors, placeholder, onSelectionChange, id, loading}) {

  // used for focusing text input when any part of the component is clicked
  const textInputRef = useRef(null);
  // used to closing the list when click occurs outside the component
  const outerRef = useRef(null);

  const getInitialOptions = useCallback(() => {
    setOptions(optionsArray.filter(option => !selectedOptionsArray.includes(option)));
    setSelectedOptions(selectedOptionsArray);
  }, [optionsArray, selectedOptionsArray]);

  const [ options, setOptions ] = useState([]);
  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ searchString, setSearchString ] = useState('');
  const [ listIsOpen, setListIsOpen ] = useState(false);

  useEffect(() => {
    if (!loading) {
      getInitialOptions();
    }
  },[loading, getInitialOptions])

  useEffect(()=> {
    // event listener for deleting selections with backspace
    window.addEventListener('keydown', removeItemByKeyPress);
    // event listener for closing list on outer click
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener('keydown', removeItemByKeyPress);
      window.removeEventListener("mousedown", handleClick);
    }
  });

  useEffect(() => {
    // this function must get passed in in order to communicate with parent compontent
    onSelectionChange({id: id, selection: selectedOptions});
  },[selectedOptions, id, onSelectionChange])

  const handleClick = (event) => {
    // close list on click outside of component
    if (outerRef.current && outerRef.current.contains(event.target)) return;
    setListIsOpen(false);
  }

  const handleTextInputChange = (event) => {
    setSearchString(event.target.value);
    if (event.target.value !== '') {
      setListIsOpen(true);
    } else {
      setListIsOpen(false);
    }
  }

  const addItem = (event) => {
    const value = event.target.dataset.value;
    setSelectedOptions([...selectedOptions, value])
    setOptions([...options].filter(option => option !== value).sort());
  }

  const removeItem = (event) => {
    setSearchString('');
    setOptions([...options, event.target.value].sort());
    setSelectedOptions([...selectedOptions].filter(option => option !== event.target.value));
  }

  const removeItemByKeyPress = (event) => {
    if (event.keyCode !== 8 || selectedOptions.length < 1 || searchString.length) return;
    if (outerRef.current.contains(document.activeElement)) {
      const deleted = [...selectedOptions].pop();
      setSelectedOptions([...selectedOptions].filter(option => option !== deleted));
      setOptions([...options, deleted].sort());
    }
  }

  const clearInput = () => {
    setSearchString('');
    setOptions(optionsArray || []);
    setSelectedOptions([]);
  }

  const toggleList = (event) => {
    // if the user has text in the input and is trying to see the list again
    // make is so clicking the down arrow clears the input and shows all options
    if (searchString !== '') {
      setSearchString('');
    } else {
      setListIsOpen(!listIsOpen);
    }
  }

  const filtered = options?.filter(option => option.toLowerCase().includes(searchString.toLowerCase()));

  return (
    <OuterWrapper ref={outerRef}>
      <MultiSelectOuterStyles selectedOptions={selectedOptions}>
        <div className="tagWrapper">
        {
          selectedOptions.map((option, i) => {
            return <Tag
              key={i+option}
              option={option}
              removeItem={removeItem}
              itemColor={itemColors ? itemColors?.hasOwnProperty(option) ? itemColors[option] : null : null}
            />
          })
        }
        </div>
        <div className="inputWrapper">
          <input placeholder={placeholder} type="text" ref={textInputRef} onChange={handleTextInputChange} value={searchString}></input>
          <button className="control" onClick={clearInput}>×</button>
          <button className="control noFocus" onClick={toggleList}>{listIsOpen ? '▲' : '▼'}</button>
        </div>
      </MultiSelectOuterStyles>
        <List
          itemColors={itemColors}
          filtered={filtered}
          longOptions={longOptions}
          addItem={addItem}
          listIsOpen={listIsOpen}
          searchString={searchString}
          textInputRef={textInputRef}
        />
    </OuterWrapper>
  )
}