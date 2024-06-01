import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import "./dropdown.scss";

function DropdownMenuOptions({ children, onClick, dropDownList, direction, onMouseOver }) {
    const handleOptionClick = (option, data) => {
        onClick({ option, data });
    };
    return (
        <div className="dropdown" onMouseOver={onMouseOver}>
            <button className="dropbtn">{children || "dropdown"}</button>
            <div
                className={
                    direction == "bottomLeft"
                        ? "dropdownContentLeft"
                        : "dropdownContent"
                }
            >
                {dropDownList?.map((option, idx) => (
                    <div
                        key={option?.id || idx}
                        onClick={() => {
                            handleOptionClick({
                                option: option.name,
                                id: option.id,
                                idx: idx,
                            });
                        }}
                    >
                        <Image src={option.src} height={24}
                            width={24}
                            alt='edit icon'
                        />
                        <div>
                            {option.name}
                        </div>
                    </div>
                )) || null}
            </div>
        </div>
    );
}

DropdownMenuOptions.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    direction: PropTypes.oneOf(["bottomRight", "bottomLeft"]),
    dropDownList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
};

DropdownMenuOptions.defaultProps = {
    direction: "bottomLeft",
};

export default DropdownMenuOptions;
