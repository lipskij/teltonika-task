import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "../styles/Nav.module.css";
import { Categories } from "./Category";

export const Nav: React.FC = () => {
  const { categories } = useSelector(
    (state: { categories: Categories }) => state.categories
  );

  // console.log(categories);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/new-user'>New user</NavLink>
        </li>
        <li>
          <NavLink to='/new-category'>New category</NavLink>
        </li>

        <ul>
          {categories?.map((category) => (
            <li key={category.id}>
              <details open>
                <summary>{category.categoryName}</summary>
                <div>
                  <ul>
                    {category.subCategories.map(({ name }, index) => (
                      <li key={name + index}>
                        <NavLink
                          to={`/category/${category.categoryName}/${name}`}
                        >
                          {name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
};
