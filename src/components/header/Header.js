import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/cmovie.png";
import "./header.scss";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "Tv Series",
    path: "/tv",
  },
];

const Header = () => {
  const [{ pathname }, headerRef] = [useLocation(), useRef(null)];
  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () =>
      document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
        ? headerRef.current.classList.add("shrink")
        : headerRef.current.classList.remove("shrink");

    window.addEventListener("scroll", shrinkHeader);
    return () => window.removeAddEventListener("scroll", shrinkHeader);
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={Logo} alt="" />
          <Link to="/">cMovies</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((value, key) => (
            <li key={key} className={`${key === active ? "active" : ""}`}>
              <Link to={value.path}>{value.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
