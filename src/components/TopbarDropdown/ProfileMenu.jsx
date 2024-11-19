import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logo from '../../assets/images/profile-img.png';
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const ProfileMenu = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={logo}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">Admin</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user align-middle me-1 " />
            <span className="fs-6">Profile</span>
          </DropdownItem>
          <div className="dropdown-divider" />
          <div onClick={handleLogout} className="dropdown-item">
            <i className="bx bx-power-off align-middle me-1 text-danger" />
            <span className="fs-6">Logout</span>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

export default ProfileMenu
