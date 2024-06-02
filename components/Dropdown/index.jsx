import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.scss";

const Dropdown = ({ options, onSelect, reset }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.name);
        onSelect(option.garageId);
        setIsOpen(false);
    };

    useEffect(() => {
        setSelectedOption(null)
    }, [reset])

    return (
        <div className={styles.dropdown}>
            <div className={styles.selectedOption} onClick={toggleDropdown}>
                {selectedOption || "Select the garage"}
            </div>
            {isOpen && (
                <div className={styles.options}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles.option}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
