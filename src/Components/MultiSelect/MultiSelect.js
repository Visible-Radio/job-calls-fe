import { useEffect, useRef, useState } from "react";
import List from "./List";
import { MultiSelectOuterStyles, OutterWrapper } from "./styles/styles";
import Tag from "./Tag";

export default function MultiSelect({ optionsArray, longOptions, colors, placeholder, loading, testFunc }) {
  const textInputRef = useRef(null);
  const outerRef = useRef(null);

  const [ options, setOptions ] = useState([]);
  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ searchString, setSearchString ] = useState('');
  const [ listIsOpen, setListIsOpen ] = useState(false);
  testFunc(selectedOptions);


  useEffect(()=> {
    window.addEventListener('keydown', removeItemByKeyPress);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener('keydown', removeItemByKeyPress);
      window.addEventListener("mousedown", handleClick);
    }
  });

  useEffect(() => {
    if (!loading) {
      setOptions(optionsArray || []);
      setSelectedOptions([]);
    }
  },[loading])

  const handleClick = (event) => {
    if (outerRef.current.contains(event.target)) return;
    setListIsOpen(false);
  }

  const focusChildOnParentClick = (event) => {
    if (event.target.classList.contains('noFocus')) return;
    textInputRef.current.focus();
  }

  const handleTextInputChange = (event) => {
    setSearchString(event.target.value)
    setListIsOpen(true);
  }

  const addItem = (event) => {
    const value = event.target.dataset.value;
    setSelectedOptions([...selectedOptions, value])
    setOptions([...options].filter(option => option !== value));
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