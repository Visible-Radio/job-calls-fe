import ListItem from "./ListItem";
import { ListStyles } from "./styles/ListStyles";

export default function List({ filtered, addItem, listIsOpen, colors, longOptions }) {

  return (
    <ListStyles listIsOpen={listIsOpen}>
      { filtered.length > 0
        ? filtered?.map((option, i) => {
          return (
            <ListItem
              color={colors ? colors?.hasOwnProperty(option) ? colors[option] : null : null}
              longOption={longOptions ? longOptions?.hasOwnProperty(option) ? longOptions[option] : null : null}
              key={i + option}
              addItem={addItem}
              option={option}
              >
            </ListItem>
          )
        })
        : <ListItem
            addItem={null}
            option={'No items match filter terms'}
            >
          </ListItem>
      }
    </ListStyles>
  )
}