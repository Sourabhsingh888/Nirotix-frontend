import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Container } from "reactstrap";

// Assets
import logoSm from "../assets/images/favicon.svg";
import logoDark from "../assets/images/logo.svg";
import logoLight from "../assets/images/logo-white.svg";

// Components
import VerticalLayout from "./VerticalLayouts";
import TwoColumnLayout from "./TwoColumnLayout";
import HorizontalLayout from "./HorizontalLayout";

interface SidebarProps {
  layoutType: "vertical" | "horizontal" | "twocolumn";
}

const Sidebar: React.FC<SidebarProps> = ({ layoutType }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOverlayClick = () => {
      document.body.classList.remove("vertical-sidebar-enable");
    };

    const overlay = overlayRef.current;
    overlay?.addEventListener("click", handleOverlayClick);

    return () => {
      overlay?.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  const toggleSidebarHoverMode = () => {
    const htmlEl = document.documentElement;
    const currentSize = htmlEl.getAttribute("data-sidebar-size");

    const nextSize =
      currentSize === "sm-hover"
        ? "sm-hover-active"
        : currentSize === "sm-hover-active"
        ? "sm-hover"
        : "sm-hover";

    htmlEl.setAttribute("data-sidebar-size", nextSize);
  };

  const renderLayoutContent = () => {
    if (layoutType === "horizontal") {
      return (
        <div id="scrollbar">
          <Container fluid>
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <HorizontalLayout />
            </ul>
          </Container>
        </div>
      );
    }

    if (layoutType === "twocolumn") {
      return (
        <>
          <TwoColumnLayout layoutType={layoutType} />
          <div className="sidebar-background"></div>
        </>
      );
    }

    return (
      <>
        <SimpleBar id="scrollbar" className="h-100">
          <Container fluid>
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <VerticalLayout layoutType={layoutType} />
            </ul>
          </Container>
        </SimpleBar>
        <div className="sidebar-background"></div>
      </>
    );
  };

  return (
    <>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="logo" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="logo" height="35" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="logo" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="logo" height="35" />
            </span>
          </Link>

          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
            onClick={toggleSidebarHoverMode}
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        {renderLayoutContent()}
      </div>

      <div className="vertical-overlay" ref={overlayRef}></div>
    </>
  );
};

export default Sidebar;
