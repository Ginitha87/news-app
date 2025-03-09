import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import NewsFeed from "./components/News/News";

function RoutesLayout() {
  return (
    <Router>
      <nav className="news-link-container">
        <ul className="news-link">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/personalized-feed"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Personalized Feed
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route
          path="/personalized-feed"
          element={<NewsFeed isPersonalized />}
        />
      </Routes>
    </Router>
  );
}

export default RoutesLayout;
