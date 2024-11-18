import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import { leftSideBarThemeTypes, leftSidebarTypes } from "../constant/layout";
import Header from "./Header";

const Layout = () => {

  // const toggleMenuCallback = () => {
  //   if (leftSideBarType === "default") {
  //     dispatch(changeSidebarType("condensed", isMobile));
  //   } else if (leftSideBarType === "condensed") {
  //     dispatch(changeSidebarType("default", isMobile));
  //   }
  // };

  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <>
      <div className="main_part">
        <Header /* toggleMenuCallback={toggleMenuCallback} */ />
        <Sidebar />
      </div >
      <div className="main-content">
      < Outlet />
      </div>
    </>
  );
}

export default Layout;