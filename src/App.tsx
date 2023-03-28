import React from "react";
import "./styles/App.css";
import { Nav } from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewUserForm from "./components/NewUserForm";
import NewCategoryForm from "./components/NewCategoryForm";
import Header from "./components/Header";
import Category from "./components/Category";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Nav />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <h1>Hello home page</h1>
              </>
            }
          />
          <Route path='/new-user' element={<NewUserForm />} />
          <Route path='/new-category' element={<NewCategoryForm />} />
          {/* route for category and list of users belonging to that category  */}
          <Route path='/category/:categoryName/:subCategory' element={<Category />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
