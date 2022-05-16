import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import styles from "./DropDown.module.scss";

export const DropDown: React.FunctionComponent<DropDownProps> = (props) => {
  const { title, items, setSelectedValue } = props;
  const [country,setCountry] = useState(title);

  return (
    <Dropdown className={` me-1`}>
      <Dropdown.Toggle  style={{padding: 0}}>
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
