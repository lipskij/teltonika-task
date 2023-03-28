import React from "react";

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "100px 50px",
        lineHeight: "2",
      }}
    >
      <h1>Front-End Task</h1>
      <ol>
        <li>
          First page: Simple form with validations for new user (password, Name,
          Last Name, email, age, gender, category)
        </li>
        <li>
          Second page: Form to create categories, sub-categories &
          sub-sub-categories for users. Menu: a menu with first two pages +
          auto-generated categories menu with entries that redirect to pages
          with users belonging to the selected category.
        </li>
      </ol>
    </div>
  );
};

export default Home;
