import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Collapse, Container } from "reactstrap";
import withRouter from "../../Components/Common/withRouter";
import SimpleBar from "simplebar-react";
import logoSm from "../../assets/images/favicon.svg";
import navdata from "../LayoutMenuData";
import VerticalLayout from "../VerticalLayouts";

//i18n
import { withTranslation } from "react-i18next";

const TwoColumnLayout = ({ layoutType, t }: any) => {
  const location = useLocation();
  const navItems = navdata().props.children;
  const [layoutMode, setLayoutMode] = useState("twocolumn");

  const activateIconSidebarActive = (id: string) => {
    const menu = document.querySelector(
      `#two-column-menu .simplebar-content-wrapper a[sub-items='${id}'].nav-icon`
    );
    menu?.classList.add("active");
  };

  const removeAllActiveStates = () => {
    const links = document.querySelectorAll(
      "#navbar-nav a, #two-column-menu a"
    );
    links.forEach((el) => {
      el.classList.remove("active");
      el.setAttribute("aria-expanded", "false");
    });

    const openMenus = document.querySelectorAll(".menu-dropdown.show");
    openMenus.forEach((el) => el.classList.remove("show"));
  };

  const activateParentDropdown = (element: HTMLElement) => {
    element.classList.add("active");

    const traverseParents = (el: HTMLElement | null) => {
      while (el && el.classList.contains("collapse")) {
        el.classList.add("show");
        const trigger = el.previousElementSibling;
        if (trigger) {
          trigger.classList.add("active");
          trigger.setAttribute("aria-expanded", "true");
        }
        el = el.parentElement?.closest(".collapse");
      }
    };

    const collapseMenu = element.closest(
      ".collapse.menu-dropdown"
    ) as HTMLElement;
    traverseParents(collapseMenu);
    activateIconSidebarActive(collapseMenu?.id);
  };

  const initMenu = useCallback(() => {
    const path = `${import.meta.env.VITE_PUBLIC_URL || ""}${location.pathname}`;
    removeAllActiveStates();

    const navLinks = document.querySelectorAll("#navbar-nav a");
    const currentLink = Array.from(navLinks).find(
      (link: any) => link.pathname === path
    );

    if (currentLink) {
      activateParentDropdown(currentLink);
    } else {
      const id = path
        .replace(import.meta.env.VITE_PUBLIC_URL || "", "")
        .replace("/", "");
      if (id) document.body.classList.add("twocolumn-panel");
      activateIconSidebarActive(id);
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    initMenu();
  }, [location.pathname, initMenu]);

  useEffect(() => {
    if (layoutType === "twocolumn") {
      const handleResize = () => {
        initMenu();
        const width = document.documentElement.clientWidth;
        const mode = width < 767 ? "vertical" : "twocolumn";
        document.documentElement.setAttribute("data-layout", mode);
        setLayoutMode(mode);
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [layoutType, initMenu]);

  const renderIconSidebar = () => (
    <SimpleBar className="twocolumn-iconview">
      <Link to="#" className="logo">
        <img src={logoSm} alt="logo" height="22" />
      </Link>
      {/* {navItems.map((item: any, idx: number) => (
        <li key={idx}>
          <Link
            to={item.subItems ? "#" : item.link || "/#"}
            sub-items={item.id}
            className="nav-icon"
            onClick={item.click}
            data-bs-toggle="collapse"
          >
            <i className={item.icon}></i>
          </Link>
        </li>
      ))} */}

      {navItems
        .filter((item: any) => item.icon) // ✅ Only render items with icons
        .map((item: any, idx: number) => (
          <li key={idx}>
            <Link
              to={item.subItems ? "#" : item.link || "/#"}
              sub-items={item.id}
              className="nav-icon"
              onClick={item.click}
              data-bs-toggle="collapse"
            >
              <i className={item.icon}></i>
            </Link>
          </li>
        ))}
    </SimpleBar>
  );

  const renderSidebarMenu = () => (
    <SimpleBar id="navbar-nav" className="navbar-nav">
      {navItems.map(
        (item: any, key: number) =>
          item.subItems && (
            <li key={key} className="nav-item">
              <Collapse
                isOpen={item.stateVariables}
                className="menu-dropdown"
                id={item.id}
              >
                <ul className="nav nav-sm flex-column">
                  {item.subItems.map((subItem: any, subKey: number) => (
                    <li className="nav-item" key={subKey}>
                      <Link
                        to={subItem.link || "#"}
                        className="nav-link"
                        onClick={subItem.click}
                        data-bs-toggle={
                          subItem.isChildItem ? "collapse" : undefined
                        }
                      >
                        {t(subItem.label)}
                        {subItem.badgeName && (
                          <span
                            className={`badge badge-pill bg-${subItem.badgeColor}`}
                          >
                            {subItem.badgeName}
                          </span>
                        )}
                      </Link>
                      {subItem.isChildItem && (
                        <Collapse
                          isOpen={subItem.stateVariables}
                          className="menu-dropdown"
                          id={item.id}
                        >
                          <ul className="nav nav-sm flex-column">
                            {(subItem.childItems || []).map(
                              (childItem: any, childKey: number) => (
                                <li className="nav-item" key={childKey}>
                                  <Link
                                    to={childItem.link || "#"}
                                    className="nav-link"
                                    onClick={childItem.click}
                                  >
                                    {t(childItem.label)}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </Collapse>
                      )}
                    </li>
                  ))}
                </ul>
              </Collapse>
            </li>
          )
      )}
    </SimpleBar>
  );

  return layoutMode === "twocolumn" ? (
    <div id="scrollbar">
      <Container fluid>
        <div id="two-column-menu">{renderIconSidebar()}</div>
        {renderSidebarMenu()}
      </Container>
    </div>
  ) : (
    <SimpleBar id="scrollbar" className="h-100">
      <Container fluid>
        <div id="two-column-menu"></div>
        <ul className="navbar-nav" id="navbar-nav">
          <VerticalLayout />
        </ul>
      </Container>
    </SimpleBar>
  );
};

TwoColumnLayout.propTypes = {
  layoutType: PropTypes.string,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(TwoColumnLayout));