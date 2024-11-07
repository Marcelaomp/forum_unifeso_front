import React from "react";
import ThreadForumList from "./components/ThreadForumList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThreadForumDetail from "./components/ThreadForumDetail";
import NewQuestion from "./components/NewQuestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ThreadForumList />} />
        <Route path="/thread/:id" element={<ThreadForumDetail />} />
        <Route path="/new" element={<NewQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
