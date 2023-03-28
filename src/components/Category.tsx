import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../styles/Category.module.css";

interface User {
  id: string;
  name: string;
}

export interface Users {
  users: User[];
}

export interface Category {
  id: string;
  categoryName: string;
  subCategories: {
    name: string;
    subsubCategory: {
      subName: string;
      users: string[];
    }[];
  }[];
}

export interface Categories {
  categories: Category[];
}

export interface SubCategories {
  subCategories: {
    name: string;
    subsubCategory: {
      subName: string;
      users: string[];
    }[];
  }[];
}

export interface SubsubCategory {
  subsubCategory: {
    subName: string;
    users: string[];
  }[];
}

const Category: React.FC = () => {
  const { subCategory, categoryName } = useParams();

  const { categories } = useSelector(
    (state: { categories: Categories }) => state.categories
  );

  const { users } = useSelector((state: { users: Users }) => state.users);

  const sub = categories
    .flatMap(({ subCategories }: SubCategories) => subCategories)
    .filter((user) => user.name === subCategory);

  return (
    <main className={styles.main}>
      <h1>Category: {categoryName}</h1>
      <ul className={styles.subCategories}>
        {sub.flatMap(({ subsubCategory }: SubsubCategory) =>
          subsubCategory.map((i) => (
            <li className={styles.subCategory} key={i.subName}>
              <p>
                {subCategory}-{i.subName}
              </p>
              <ul>
                {users
                  .filter((user: User) => i.users.includes(user.id))
                  .map((user) => (
                    <li className={styles.userList} key={user.id}>
                      {user.name}
                    </li>
                  ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default Category;
