import {
  faAnchorLock,
  faCog,
  faPlusCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./SideBar.module.scss";

export const SideBar: React.FunctionComponent = () => {
  const renderButton = (title: string, icon: IconDefinition) => (
    <div className={`${styles.settings}`} role="button">
      <FontAwesomeIcon className="me-2" icon={icon} /> <div>{title}</div>
    </div>
  );

  return (
    <div className={`bg-success ${styles.sidebar}`}>
      <div className="d-flex flex-column">
      {renderButton("Settings", faCog)}
      {renderButton("Aggregated Chart", faPlusCircle)}
      {renderButton("mixas", faAnchorLock)}
      </div>
    </div>
  );
};
