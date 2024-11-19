import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const CustomDropdown = () => {
    return (
        <div
            className="three-dots-options"
        // style={{
        //     position: "absolute",
        //     top: toolbarPosition.top,
        //     left: toolbarPosition.left,
        //     display: "inline-block",
        // }}
        >
            <div
                className="dropdown-board-home three-dots"
            >
                <Dropdown>
                    <DropdownToggle
                        id="card-dropdown"
                    // className="p-0"
                    >
                        <i className="fa-solid fa-ellipsis three-dots-icon"></i>
                    </DropdownToggle>
                    <DropdownMenu
                        align={"start"}
                        className="card-dropdown-menu"
                    >
                        <DropdownItem
                        >
                            <i className="fas fa-edit me-2"></i>
                            Edit
                        </DropdownItem>
                        <DropdownItem
                            className="text-danger"
                        >
                            <i className="fas fa-trash me-3"></i>
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default CustomDropdown;