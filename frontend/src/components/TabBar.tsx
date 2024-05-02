import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./tabBar.css";

const TabBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.onscroll = function () {
      let lastScrollTop = 0;
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };
  }, []);

  return (
    <div className={`tabBar dark:bg-black-99 ${isVisible ? "" : "hide"}`}>
      <NavLink to="/feed">
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/feed"
                ? "/img/ActiveHomeIcon.svg"
                : "/img/HomeIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink to="/search">
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/search"
                ? "/img/ActiveSearchIcon.svg"
                : "/img/SearchIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink to="/newpost">
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/newpost"
                ? "/img/ActiveUploadIcon.svg"
                : "/img/UploadIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
      <NavLink to="/profile">
        <button className="noStyleBtn">
          <img
            src={
              location.pathname === "/profile"
                ? "/img/ActiveProfileIcon.svg"
                : "/img/ProfileIcon.svg"
            }
            alt=""
          />
        </button>
      </NavLink>
    </div>
  );
};

export default TabBar;
