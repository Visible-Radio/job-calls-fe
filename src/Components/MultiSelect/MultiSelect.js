import { useEffect, useRef, useState } from "react";
import List from "./List";
import { MultiSelectOuterStyles, OutterWrapper } from "./styles/styles";
import Tag from "./Tag";

export default function MultiSelect({ optionsArray, longOptions, colors, placeholder, reportMultiSelectState, id, propsSelectedOptions, propsOptions }) {
  // used for focusing text input when any part of the component is clicked
  const textInputRef = useRef(null);
  // used to closing the list when click occurs outside the component
  const outerRef = useRef(null);

  // instead of keeping two arrays...mabye keep one
  // each option could be an object with a property of 'selected' that gets toggled on and off
  const [ options, setOptions ] = useState(propsOptions || optionsArray);
  const [ selectedOptions, setSelectedOptions ] = useState(propsSelectedOptions || []);
  const [ searchString, setSearchString ] = useState('');
  const [ listIsOpen, setListIsOpen ] = useState(false);
  const [ loaded, setLoaded] = useState(false);

  useEffect(()=> {
    window.addEventListener('keydown', removeItemByKeyPress);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener('keydown', removeItemByKeyPress);
      window.addEventListener("mousedown", handleClick);
    }
  });

  useEffect(() => {
    // check that list of options from async source has arrived
    if (optionsArray && optionsArray.length) setLoaded(true);
  }, [optionsArray])

  useEffect(() => {
    // only populate options from master async source once
    if (loaded && optionsArray)  {
      setOptions(optionsArray)
    }
  }, [loaded])

  useEffect(()=> {
    // report state to parent when local state changes
    reportMultiSelectState(selectedOptions, options, id);
  }, [selectedOptions, options, reportMultiSelectState, id ])

  const handleClick = (event) => {
    // close list on click outside of component
    if (outerRef.current && outerRef.current.contains(event.target)) return;
    setListIsOpen(false);
  }

  const focusChildOnParentClick = (event) => {
    // if (event.target.classList.contains('noFocus')) return;
    // textInputRef.current.focus();
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
    setOptions([...options].filter(option => option !== value));
  }

  const removeItem = (event) => {
    setSearchString('');
    setOptions([...options, event.target.value]);
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
    <OutterWrapper ref={outerRef}>
      <MultiSelectOuterStyles onClick={focusChildOnParentClick} selectedOptions={selectedOptions}>
        <div className="tagWrapper">
        {
          selectedOptions.map((option, i) => {
            return <Tag
              key={i+option}
              option={option}
              removeItem={removeItem}
              color={colors ? colors?.hasOwnProperty(option) ? colors[option] : null : null}
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
        colors={colors}
        filtered={filtered}
        longOptions={longOptions}
        addItem={addItem}
        listIsOpen={listIsOpen}
        searchString={searchString}
        textInputRef={textInputRef}
      />
    </OutterWrapper>
  )
}