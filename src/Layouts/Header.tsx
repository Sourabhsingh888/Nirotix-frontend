// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap";

// //import images
// import logoSm from "../assets/images/favicon.svg";
// import logoDark from "../assets/images/logo.svg";
// import logoLight from "../assets/images/logo-white.svg";

// //import Components
// import SearchOption from "../Components/Common/SearchOption";
// import FullScreenDropdown from "../Components/Common/FullScreenDropdown";
// import ProfileDropdown from "../Components/Common/ProfileDropdown";
// import LightDark from "../Components/Common/LightDark";

// import { changeSidebarVisibility } from "../slices/thunks";
// import { useSelector, useDispatch } from "react-redux";
// import { createSelector } from "reselect";

// const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }: any) => {
//   const dispatch: any = useDispatch();

//   const selectDashboardData = createSelector(
//     (state) => state.Layout,
//     (sidebarVisibilitytype) => sidebarVisibilitytype.sidebarVisibilitytype
//   );
//   // Inside your component
//   const sidebarVisibilitytype = useSelector(selectDashboardData);

//   const [search, setSearch] = useState<boolean>(false);
//   const toogleSearch = () => {
//     setSearch(!search);
//   };

//   const toogleMenuBtn = () => {
//     var windowSize = document.documentElement.clientWidth;
//     const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement;
//     dispatch(changeSidebarVisibility("show"));

//     if (windowSize > 767) humberIcon.classList.toggle("open");

//     //For collapse horizontal menu
//     if (document.documentElement.getAttribute("data-layout") === "horizontal") {
//       document.body.classList.contains("menu")
//         ? document.body.classList.remove("menu")
//         : document.body.classList.add("menu");
//     }

//     //For collapse vertical and semibox menu
//     if (
//       sidebarVisibilitytype === "show" &&
//       (document.documentElement.getAttribute("data-layout") === "vertical" ||
//         document.documentElement.getAttribute("data-layout") === "semibox")
//     ) {
//       if (windowSize < 1025 && windowSize > 767) {
//         document.body.classList.remove("vertical-sidebar-enable");
//         document.documentElement.getAttribute("data-sidebar-size") === "sm"
//           ? document.documentElement.setAttribute("data-sidebar-size", "")
//           : document.documentElement.setAttribute("data-sidebar-size", "sm");
//       } else if (windowSize > 1025) {
//         document.body.classList.remove("vertical-sidebar-enable");
//         document.documentElement.getAttribute("data-sidebar-size") === "lg"
//           ? document.documentElement.setAttribute("data-sidebar-size", "sm")
//           : document.documentElement.setAttribute("data-sidebar-size", "lg");
//       } else if (windowSize <= 767) {
//         document.body.classList.add("vertical-sidebar-enable");
//         document.documentElement.setAttribute("data-sidebar-size", "lg");
//       }
//     }

//     //Two column menu
//     if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
//       document.body.classList.contains("twocolumn-panel")
//         ? document.body.classList.remove("twocolumn-panel")
//         : document.body.classList.add("twocolumn-panel");
//     }
//   };

//   return (
//     <React.Fragment>
//       <header id="page-topbar" className={headerClass}>
//         <div className="layout-width">
//           <div className="navbar-header">
//             <div className="d-flex">
//               <div className="navbar-brand-box horizontal-logo">
//                 <Link to="/" className="logo logo-dark">
//                   <span className="logo-sm">
//                     <img src={logoSm} alt="" height="22" />
//                   </span>
//                   <span className="logo-lg">
//                     <img src={logoDark} alt="" height="17" />
//                   </span>
//                 </Link>

//                 <Link to="/" className="logo logo-light">
//                   <span className="logo-sm">
//                     <img src={logoSm} alt="" height="22" />
//                   </span>
//                   <span className="logo-lg">
//                     <img src={logoLight} alt="" height="17" />
//                   </span>
//                 </Link>
//               </div>

//               <button
//                 onClick={toogleMenuBtn}
//                 type="button"
//                 className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger shadow-none"
//                 id="topnav-hamburger-icon"
//               >
//                 <span className="hamburger-icon">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </span>
//               </button>
//               <SearchOption />
//             </div>

//             <div className="d-flex align-items-center">
//               <Dropdown
//                 isOpen={search}
//                 toggle={toogleSearch}
//                 className="d-md-none topbar-head-dropdown header-item"
//               >
//                 <DropdownToggle
//                   type="button"
//                   tag="button"
//                   className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
//                 >
//                   <i className="bx bx-search fs-22"></i>
//                 </DropdownToggle>
//                 <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
//                   <Form className="p-3">
//                     <div className="form-group m-0">
//                       <div className="input-group">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Search ..."
//                           aria-label="Recipient's username"
//                         />
//                         <button className="btn btn-primary" type="submit">
//                           <i className="mdi mdi-magnify"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </Form>
//                 </DropdownMenu>
//               </Dropdown>

//               {/* FullScreenDropdown */}
//               <FullScreenDropdown />

//               {/* Dark/Light Mode set */}
//               <LightDark
//                 layoutMode={layoutModeType}
//                 onChangeLayoutMode={onChangeLayoutMode}
//               />

//               {/* ProfileDropdown */}
//               <ProfileDropdown />
//             </div>
//           </div>
//         </div>
//       </header>
//     </React.Fragment>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

// Components
import SearchOption from "../Components/Common/SearchOption";
import FullScreenDropdown from "../Components/Common/FullScreenDropdown";
import ProfileDropdown from "../Components/Common/ProfileDropdown";
import LightDark from "../Components/Common/LightDark";

// Assets
import logoSm from "../assets/images/favicon.svg";
import logoDark from "../assets/images/logo.svg";
import logoLight from "../assets/images/logo-white.svg";

// Redux
import { changeSidebarVisibility } from "../slices/thunks";

// Props type
interface HeaderProps {
  onChangeLayoutMode: () => void;
  layoutModeType: string;
  headerClass?: string;
}

// Redux selector
const selectSidebarVisibility = createSelector(
  (state: any) => state.Layout,
  (layout) => layout.sidebarVisibilitytype
);

const Header: React.FC<HeaderProps> = ({
  onChangeLayoutMode,
  layoutModeType,
  headerClass,
}) => {
  const dispatch = useDispatch();
  const sidebarVisibilitytype = useSelector(selectSidebarVisibility);

  const [search, setSearch] = useState(false);
  const toggleSearch = () => setSearch((prev) => !prev);

  const toggleMenuBtn = () => {
    const windowSize = document.documentElement.clientWidth;
    const hamburgerIcon = document.querySelector(
      ".hamburger-icon"
    ) as HTMLElement;

    dispatch(changeSidebarVisibility("show"));

    if (windowSize > 767) {
      hamburgerIcon?.classList.toggle("open");
    }

    const layout = document.documentElement.getAttribute("data-layout");

    // Horizontal Layout
    if (layout === "horizontal") {
      document.body.classList.toggle("menu");
    }

    // Vertical & SemiBox Layout
    if (
      sidebarVisibilitytype === "show" &&
      (layout === "vertical" || layout === "semibox")
    ) {
      if (windowSize > 767 && windowSize < 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        const sidebarSize =
          document.documentElement.getAttribute("data-sidebar-size");
        document.documentElement.setAttribute(
          "data-sidebar-size",
          sidebarSize === "sm" ? "" : "sm"
        );
      } else if (windowSize >= 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        const sidebarSize =
          document.documentElement.getAttribute("data-sidebar-size");
        document.documentElement.setAttribute(
          "data-sidebar-size",
          sidebarSize === "lg" ? "sm" : "lg"
        );
      } else {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }

    // Two Column Layout
    if (layout === "twocolumn") {
      document.body.classList.toggle("twocolumn-panel");
    }
  };

  return (
    <header id="page-topbar" className={headerClass}>
      <div className="layout-width">
        <div className="navbar-header d-flex justify-content-between align-items-center">
          {/* Logo + Hamburger */}
          <div className="d-flex align-items-center">
            <div className="navbar-brand-box horizontal-logo">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="small logo" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="dark logo" height="17" />
                </span>
              </Link>
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="small logo light" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="light logo" height="17" />
                </span>
              </Link>
            </div>

            <button
              onClick={toggleMenuBtn}
              type="button"
              className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger shadow-none"
              id="topnav-hamburger-icon"
            >
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Search Option Desktop */}
            <SearchOption />
          </div>

          {/* Right Section */}
          <div className="d-flex align-items-center">
            {/* Mobile Search */}
            <Dropdown
              isOpen={search}
              toggle={toggleSearch}
              className="d-md-none topbar-head-dropdown header-item"
            >
              <DropdownToggle
                tag="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              >
                <i className="bx bx-search fs-22"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                <Form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify"></i>
                      </button>
                    </div>
                  </div>
                </Form>
              </DropdownMenu>
            </Dropdown>

            <FullScreenDropdown />
            <LightDark
              layoutMode={layoutModeType}
              onChangeLayoutMode={onChangeLayoutMode}
            />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
