import { useEffect, useRef, useState } from "react";
import List from "./List";
import { MultiSelectOuterStyles, OutterWrapper } from "./styles/styles";
import Tag from "./Tag";

export default function MultiSelect({ optionsArray, longOptions, colors, placeholder, reportState, id, propsSelectedOptions, propsOptions }) {
  const textInputRef = useRef(null);
  const outerRef = useRef(null);

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
    reportState(selectedOptions, options, id);
  }, [selectedOptions, options, reportState, id ])

  const handleClick = (event) => {
    // close list on click outside of component
    if (outerRef.current && outerRef.current.contains(event.target)) return;
    setListIsOpen(false);
  }

  const focusChildOnParentClick = (event) => {
    if (event.target.classList.contains('noFocus')) return;
    textInputRef.current.focus();
  }

  const handleTextInputChange = (event) => {
    setSearchString(event.target.value);
    if (event.target.value.length !== 0) setListIsOpen(true);
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
    setListIsOpen(!listIsOpen);
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
      />
    </OutterWrapper>
  )
}