import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../slices/auth/login/thunk";

// import image
import avatar1 from "../../assets/images/users/avatar-1.jpg";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // selector to extract user
const user = useSelector((state: any) => state.Profile?.user);

  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const authUser = sessionStorage.getItem("authUser");
    if (authUser) {
      const obj = JSON.parse(authUser);
      const authType = import.meta.env.VITE_DEFAULTAUTH;

      if (authType === "fake") {
        setUserName(
          obj?.username || user?.first_name || obj?.data?.first_name || "Admin"
        );
      } else if (authType === "firebase") {
        setUserName(obj?.email || "Admin");
      } else {
        setUserName("Admin");
      }
    }
  }, [user]);

  // Dropdown toggle state
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown((prev) => !prev);
  };

const handleLogout = () => {
  dispatch(logoutUser(navigate));
};

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn shadow-none">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {userName}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                Founder
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {userName}!</h6>
          <DropdownItem href="/profile">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>{" "}
            Profile
          </DropdownItem>
          <DropdownItem href="/apps-chat">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
            Messages
          </DropdownItem>
          <DropdownItem href="#">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
            Taskboard
          </DropdownItem>
          <DropdownItem href="/pages-faqs">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
            Help
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem href="/pages-profile">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
            Balance : <b>$5971.67</b>
          </DropdownItem>
          <DropdownItem href="/pages-profile-settings">
            <span className="badge bg-success-subtle text-success mt-1 float-end">
              New
            </span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
            Settings
          </DropdownItem>
          <DropdownItem href="/auth-lockscreen-basic">
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
            Lock screen
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
