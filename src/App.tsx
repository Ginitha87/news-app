import React from "react";
import RoutesLayout from "./Routes";

function App() {
  return (
    <div className="aggregator-news">
      <header className="news-header">
        <h1>News Aggregator</h1>
      </header>
      <RoutesLayout />
    </div>
  );
}

export default App;
