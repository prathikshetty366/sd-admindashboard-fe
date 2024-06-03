import React, { useEffect, useState } from "react";
import styles from "./dropdown.module.scss";

const ServiceDropdown = ({ options, onSelect, reset, notGarage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.name);
        onSelect(option.id);
        setIsOpen(false);
    };

    useEffect(() => {
        setSelectedOption(null)
    }, [reset])

    return (
        <div className={styles.dropdown}>
            <div className={styles.selectedOption} onClick={toggleDropdown}>
                {selectedOption || "Update the status"}
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

export default ServiceDropdown;
