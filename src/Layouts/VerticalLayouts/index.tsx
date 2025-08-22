// New upadated code
import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useTranslation } from "react-i18next";

// Data & HOC
import navdata from "../LayoutMenuData";
import withRouter from "../../Components/Common/withRouter";

// Redux selector
const selectLayoutProperties = createSelector(
  (state) => state.Layout,
  ({ leftsidbarSizeType, sidebarVisibilitytype, layoutType }) => ({
    leftsidbarSizeType,
    sidebarVisibilitytype,
    layoutType,
  })
);

const VerticalLayout = ({ router }: any) => {
  // Get role from sessionStorage instead of hardcoding
  const storedAuth = sessionStorage.getItem("authUser");
  let role = null;

  try {
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      role = parsed?.user?.role || parsed?.role || null;
    }
  } catch (err) {
    console.error("Error parsing authUser from sessionStorage", err);
  }

  const [sections, setSections] = useState({
    services: false,
    myaccount: false,
    management: false,
    messages: false,
    currentState: "",
  });

  const toggleSection = (sectionName: string) => {
    setSections((prev) => {
      const resetSections: any = {};
      Object.keys(prev).forEach((key) => {
        if (key !== "currentState") resetSections[key] = false;
      });
      return {
        ...resetSections,
        [sectionName]: !prev[sectionName],
        currentState: sectionName,
      };
    });
  };

  const navData = navdata(role, toggleSection, sections).filter((item) => {
    // Always show Menu and Dashboard
    if (item.id === "menu-header" || item.id === "dashboard") return true;
    // If item has a role, check match
    if (item.role) return item.role === role;
    return true; // If no role specified, show for all
  });

  const { t } = useTranslation();
  const { leftsidbarSizeType, sidebarVisibilitytype, layoutType } = useSelector(
    selectLayoutProperties
  );

  // Resize behavior
  const resizeSidebarMenu = useCallback(() => {
    const windowSize = document.documentElement.clientWidth;
    const hamburgerIcon = document.querySelector(
      ".hamburger-icon"
    ) as HTMLElement;
    const layout = document.documentElement.getAttribute("data-layout");

    if (windowSize >= 1025) {
      if (["vertical", "semibox"].includes(layout!)) {
        document.documentElement.setAttribute(
          "data-sidebar-size",
          leftsidbarSizeType
        );
      }
      if (["show", "vertical", "twocolumn"].includes(sidebarVisibilitytype)) {
        hamburgerIcon?.classList.remove("open");
      } else {
        hamburgerIcon?.classList.add("open");
      }
    } else if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove("twocolumn-panel");
      if (["vertical", "semibox"].includes(layout!)) {
        document.documentElement.setAttribute("data-sidebar-size", "sm");
      }
      hamburgerIcon?.classList.add("open");
    } else {
      document.body.classList.remove("vertical-sidebar-enable");
      if (layout !== "horizontal") {
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
      hamburgerIcon?.classList.add("open");
    }
  }, [leftsidbarSizeType, sidebarVisibilitytype]);

  useEffect(() => {
    window.addEventListener("resize", resizeSidebarMenu);
    return () => window.removeEventListener("resize", resizeSidebarMenu);
  }, [resizeSidebarMenu]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathname = `${import.meta.env.VITE_PUBLIC_URL || ""}${
        router.location.pathname
      }`;
      const ul = document.getElementById("navbar-nav");
      if (!ul) return;
      const items = Array.from(ul.getElementsByTagName("a"));
      removeActivation(items);
      const activeItem = items.find((x: any) => x.pathname === pathname);
      if (activeItem) activateParentDropdown(activeItem);
    };

    if (layoutType === "vertical") initMenu();
  }, [router.location.pathname, layoutType]);

  const activateParentDropdown = (item: HTMLElement) => {
    item.classList.add("active");
    const parentCollapse = item.closest(".collapse.menu-dropdown");
    if (parentCollapse) {
      parentCollapse.classList.add("show");
      const parentToggle = parentCollapse.previousElementSibling;
      parentToggle?.classList.add("active");
      parentToggle?.setAttribute("aria-expanded", "true");

      const grandParentCollapse = parentCollapse.closest(
        ".collapse.menu-dropdown"
      );
      if (grandParentCollapse) {
        grandParentCollapse.classList.add("show");
        grandParentCollapse.previousElementSibling?.classList.add("active");

        const greatGrandCollapse = grandParentCollapse.closest(
          ".collapse.menu-dropdown"
        );
        if (greatGrandCollapse) {
          greatGrandCollapse.classList.add("show");
          greatGrandCollapse.previousElementSibling?.classList.add("active");
        }
      }
    }
  };

  const removeActivation = (items: Element[]) => {
    items.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-expanded", "false");
      const sibling = item.nextElementSibling;
      if (sibling?.classList.contains("show")) sibling.classList.remove("show");
    });
  };

  const renderMenuItems = (items: any[]) => {
    return items.map((item, idx) => {
      if (item.isHeader) {
        return (
          <li className="menu-title" key={idx}>
            <span>{t(item.label)}</span>
          </li>
        );
      }

      if (item.subItems) {
        return (
          <li className="nav-item" key={idx}>
            <Link
              className="nav-link menu-link"
              to={item.link || "/#"}
              onClick={item.click}
            >
              <i className={item.icon}></i>
              <span>{t(item.label)}</span>
            </Link>
            <Collapse className="menu-dropdown" isOpen={item.stateVariables}>
              <ul className="nav nav-sm flex-column">
                {renderMenuItems(item.subItems)}
              </ul>
            </Collapse>
          </li>
        );
      }

      return (
        <li className="nav-item" key={idx}>
          <Link className="nav-link menu-link" to={item.link || "/#"}>
            {/* <i className={item.icon}></i> */}
            <span>{t(item.label)}</span>
          </Link>
        </li>
      );
    });
  };

  return <>{renderMenuItems(navData)}</>;
};

export default withRouter(VerticalLayout);
