import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Search.module.scss";

const Search: React.FunctionComponent<SearchProps> = ({ placeholder, onChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchFiledIcon, setSearchFiledIcon] = useState(faSearch);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            setSearchFiledIcon(faTimes);
        } else {
            setSearchFiledIcon(faSearch);
        }
    };

    const handleResetSearch = useCallback(() => {
        setSearchTerm("");
        setSearchFiledIcon(faSearch);
    }, []);

    useEffect(() => {
        onChange(searchTerm);
    }, [searchTerm, onChange]);

    return (
        <div className="position-relative">
            <Form>
                <Form.Control
                    onChange={onSearchChange}
                    value={searchTerm}
                    type="text"
                    placeholder={placeholder}
                    size="sm"
                    className={`${styles.searchInput} px-2`}
                />

                <span className={`${styles.searchIcon} `}>
                    <FontAwesomeIcon
                        icon={searchFiledIcon as IconProp}
                        onClick={handleResetSearch}
                        role="button"
                    />
                </span>
            </Form>
        </div>
    );
};

export interface SearchProps {
    placeholder: string;
    onChange: (event: string) => void;
}

export default Search;
