import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Col, Collapse, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/Common/withRouter";
import navdata from "../LayoutMenuData";

const HorizontalLayout = ({t, layoutType,}: {
  t: any;
  layoutType: string;
}) => {
  const [isMoreMenu, setIsMoreMenu] = useState(false);
  const location = useLocation();
  const navData = navdata().props.children || [];
  console.log("navData", navData);
  

  // ===============================================
  const menuSplitContainer = 8;
  const menuItems: any[] = [];
  const splitMenuItems: any[] = [];

  navData.forEach((value: any, key: number) => {
    if (key >= menuSplitContainer) {
      const val = {
        ...value,
        childItems: value.subItems,
        isChildItem: !!value.subItems,
      };
      delete val.subItems;
      splitMenuItems.push(val);
    } else {
      menuItems.push(value);
    }
  });

  // ================================================
// const menuItems: any[] = [];
// const splitMenuItems: any[] = [];

// let moveToMore = false;

// navData.forEach((item) => {
//   if (item.label === "Message Section") {
//     // All next items go to More
//     moveToMore = true;
//     splitMenuItems.push(item);
//     return;
//   }

//   if (moveToMore) {
//     const val = {
//       ...item,
//       childItems: item.subItems,
//       isChildItem: !!item.subItems,
//     };
//     delete val.subItems;
//     splitMenuItems.push(val);
//   } else {
//     menuItems.push(item);
//   }
// });

// ==================================================
  
  // const menuItems: any[] = [];
  // const splitMenuItems: any[] = [];

  // let moveToMore = false;

  // navData.forEach((item) => {
  //   // Hide the "Message Section" and "Management Section" headers
  //   if (
  //     item.label === "Message Section" ||
  //     item.label === "Management Section"
  //   ) {
  //     return;
  //   }

  //   // Start collecting items into "More" after MSG Management (id = 'messageManagement')
  //   if (item.id === "messageManagement") {
  //     moveToMore = true;
  //   }

  //   if (moveToMore) {
  //     const val = {
  //       ...item,
  //       childItems: item.subItems,
  //       isChildItem: !!item.subItems,
  //     };
  //     delete val.subItems;
  //     splitMenuItems.push(val);
  //   } else {
  //     menuItems.push(item);
  //   }
  // });

  menuItems.push({
    id: "more",
    label: "More",
    icon: "ri-briefcase-2-line",
    link: "#",
    stateVariables: isMoreMenu,
    subItems: splitMenuItems,
    click: (e: any) => {
      e.preventDefault();
      setIsMoreMenu((prev) => !prev);
    },
  });

  const activateParentDropdown = useCallback((item: any) => {
    item.classList.add("active");
    const parentCollapseDiv = item.closest(".collapse.menu-dropdown");
    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add("show");
      const parent = parentCollapseDiv.parentElement;
      if (parent) {
        parent.children[0]?.classList.add("active");
        parent.children[0]?.setAttribute("aria-expanded", "true");
        const grandParentCollapse = parent.closest(".collapse.menu-dropdown");
        if (grandParentCollapse) {
          grandParentCollapse.classList.add("show");
          const grandParentToggle = grandParentCollapse.previousElementSibling;
          grandParentToggle?.classList.add("active");
        }
      }
    }
  }, []);

  const removeActivation = (items: HTMLAnchorElement[]) => {
    items.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-expanded", "false");
      item.nextElementSibling?.classList.remove("show");
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = `${import.meta.env.VITE_PUBLIC_URL || ""}${
        location.pathname
      }`;
      const nav = document.getElementById("navbar-nav");
      if (!nav) return;
      const links = Array.from(
        nav.getElementsByTagName("a")
      ) as HTMLAnchorElement[];

      removeActivation(links);
      const activeItem = links.find((link) => link.pathname === pathName);
      if (activeItem) activateParentDropdown(activeItem);
    };

    if (layoutType === "vertical") initMenu();
  }, [location.pathname, layoutType, activateParentDropdown]);

  const renderSubItems = (subItems: any[]) => (
    <ul className="nav nav-sm flex-column test">
      {subItems.map((subItem, idx) => (
        <li className="nav-item" key={idx}>
          <Link
            to={subItem.link || "#"}
            className="nav-link"
            onClick={subItem.click || undefined}
            data-bs-toggle={subItem.childItems ? "collapse" : undefined}
          >
            {t(subItem.label)}
          </Link>
          {subItem.childItems && (
            <Collapse
              className="menu-dropdown"
              isOpen={subItem.stateVariables}
              id={subItem.id || "childCollapse"}
            >
              <ul className="nav nav-sm flex-column">
                {subItem.childItems.map((child: any, i: number) => (
                  <li className="nav-item" key={i}>
                    <Link
                      to={child.link || "#"}
                      className="nav-link"
                      onClick={child.click || undefined}
                    >
                      {t(child.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </Collapse>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.isHeader ? (
            <li className="menu-title">
              <span data-key="t-menu">{t(item.label)}</span>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                onClick={item.click || undefined}
                className="nav-link menu-link"
                to={item.link || "#"}
                data-bs-toggle={item.subItems ? "collapse" : undefined}
              >
                <i className={item.icon}></i> <span>{t(item.label)}</span>
              </Link>
              {item.subItems && (
                <Collapse
                  className={
                    item.subItems.length > 13
                      ? "menu-dropdown mega-dropdown-menu"
                      : "menu-dropdown"
                  }
                  isOpen={item.stateVariables}
                  id={item.id || "collapse"}
                >
                  {item.subItems.length > 13 ? (
                    <Row>
                      {item.subItems.map((sub, idx) => (
                        <Col lg={4} key={idx}>
                          <ul className="nav nav-sm flex-column">
                            <li className="nav-item">
                              <Link to={sub.link || "#"} className="nav-link">
                                {t(sub.label)}
                              </Link>
                            </li>
                          </ul>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    renderSubItems(item.subItems)
                  )}
                </Collapse>
              )}
            </li>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

HorizontalLayout.propTypes = {
  layoutType: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default withRouter(withTranslation()(HorizontalLayout));
