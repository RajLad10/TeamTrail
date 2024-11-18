import { Fragment } from "react";
import { Link } from "react-router-dom";

const NewSidebar = () => {
    return (
        <Fragment>
            <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              {/* <img src={logo} alt="" height="30" /> */}
            </span>
            <span className="logo-lg">
              {/* <img src={logoDark} alt="" height="17" className="h-logo" /> */}
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              {/* <img src={logoLightSvg} alt="" height="30" /> */}
            </span>
            <span className="logo-lg">
              {/* <img src={logoLightPng} alt="" height="19" className="h-logo" /> */}
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {/* {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />} */}
        </div>
        <div className="sidebar-background"></div>
      </div>
        </Fragment>
    )
}

export default NewSidebar;