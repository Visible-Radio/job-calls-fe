import { useEffect, useRef, useState } from "react";
import List from "./List";
import { MultiSelectOuterStyles, OutterWrapper } from "./styles/styles";
import Tag from "./Tag";

export default function MultiSelect({ optionsArray }) {
  const textInput = useRef(null);

  const [ options, setOptions ] = useState(optionsArray || []);
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
    setOptions(optionsArray || [])
  },[optionsArray])

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
    setSearchString('');
    setOptions(optionsArray || []);
    setSelectedOptions([]);
  }

  const toggleList = () => {
    setListIsOpen(!listIsOpen);
  }

  const filtered = options.filter(option => option.toLowerCase().includes(searchString.toLowerCase()));

  return (
    <OutterWrapper>
      <MultiSelectOuterStyles onClick={focusChildOnParentClick} selectedOptions={selectedOptions}>
        <div className="tagWrapper">
        {
          selectedOptions.map((option, i) => {
            return <Tag key={i+option} option={option} removeItem={removeItem}/>
          })
        }
        </div>
        <div className="inputWrapper">
          <input placeholder="Search companies" type="text" ref={textInput} onChange={handleTextInputChange} value={searchString}></input>
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