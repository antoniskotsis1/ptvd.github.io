import React, { useCallback, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Search from "../Search/Search";

export const DropDown: React.FunctionComponent<DropDownProps> = (props) => {
  const { title, items, setSelectedValue, isNavBar } = props;
  const [country, setCountry] = useState(title);
  const [search, setSearch] = useState("");
  const [filteredItems, setItems] = useState(items);

  const onSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      setItems(
        items.filter((item) =>
          item.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    },
    [items, search]
  );

  return (
    <Dropdown className={` me-1`}>
      <Dropdown.Toggle style={{ padding: isNavBar?4:0 }}>{title}</Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: "50vh", overflow: "auto" }}>
        {!isNavBar && (
          <Dropdown.Header>
            <Search placeholder="Search" onChange={onSearchChange} />
          </Dropdown.Header>
        )}
        {filteredItems.map((name: string) => {
          return (
            <Dropdown.Item
              key={name}
              onClick={() => {
                setSelectedValue(name);
                setCountry(name);
              }}
            >
              {name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

interface DropDownProps {
  title: string;
  items: string[];
  setSelectedValue: (name: string) => void;
  isNavBar?: boolean;
}
