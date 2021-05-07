import { useEffect } from "react";
import ListItem from "./ListItem";
import { ListStyles } from "./styles/ListStyles";
import useRoveFocus from "./utils/useRoveFocus";

export default function List({ filtered, addItem, listIsOpen, colors, longOptions, textInputRef}) {
  const [focus, setFocus] = useRoveFocus(filtered?.length, textInputRef);

  useEffect(()=> {
    setFocus(-1);
  }, [filtered, setFocus, listIsOpen]);

  return (
    <ListStyles listIsOpen={listIsOpen}>
      {listIsOpen && <>
        { filtered?.length > 0
          ? filtered?.map((option, i) => {
            return (
              <ListItem
                color={colors ? colors?.hasOwnProperty(option) ? colors[option] : null : null}
                longOption={longOptions ? longOptions?.hasOwnProperty(option) ? longOptions[option] : null : null}
                key={i + option}
                addItem={addItem}
                option={option}
                setFocus={setFocus}
                focus={focus === i}
                index={i}
                listIsOpen={listIsOpen}
                length={filtered.length}
                filtered={filtered}
                >
              </ListItem>
            )
          })
          : <ListItem
              addItem={null}
              option={'No items match filter terms'}
              >
            </ListItem>
        } </>
      }
    </ListStyles>
  )
}