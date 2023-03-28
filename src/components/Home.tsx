import React from "react";
import ExportButton from "./ExportCategories";

const Home: React.FC = () => {
  return (
    <div className='home'>
      <h1>Front-End Task</h1>
      <ul>
        <li>
          First page: Simple form with validations for new user (password, Name,
          Last Name, email, age, gender, category).
        </li>
        <li>
          Second page: Form to create categories, sub-categories &
          sub-sub-categories for users. Menu: a menu with first two pages +
          auto-generated categories menu with entries that redirect to pages
          with users belonging to the selected category.
        </li>
        <li>
          Extra: button to export all data in a JSON format.
          <ExportButton />
        </li>
      </ul>
    </div>
  );
};

export default Home;
