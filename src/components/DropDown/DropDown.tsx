import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

export const DropDown: React.FunctionComponent<DropDownProps> = (props) => {
  const { title, items, setSelectedValue } = props;
  const [country,setCountry] = useState(title);

  return (
    <Dropdown className="me-1">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: "50vh", overflow: "auto"}}>
        {items.map((name: string) => {
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
  setSelectedValue: (name:string) => void;
}
