import React from "react";
import "./styles/App.css";
import { Nav } from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewUserForm from "./components/NewUserForm";
import NewCategoryForm from "./components/NewCategoryForm";
import Header from "./components/Header";
import Category from "./components/Category";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
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
          <Route
            path='/category/:categoryName/:subCategory'
            element={<Category />}
          />
        </Routes>
      </Router>
      <Footer year={2023} companyName={"Front end task by Emil Lipskij"} />
    </>
  );
}

export default App;
