import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../app/features/users/users";
import styles from "../styles/NewUser.module.css";
import { Categories, UserFormData } from "../types/types";

const initialFormData: UserFormData = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  age: 0,
  gender: "",
  category: "",
};

const NewUserForm: React.FC = () => {
  const [validationMessages, setValidationMessages] = React.useState<string[]>(
    []
  );
  const [formData, setFormData] = React.useState<UserFormData>(initialFormData);
  const dispatch = useDispatch();
  const { categories } = useSelector(
    (state: { categories: Categories }) => state.categories
  );

  const handleChange = React.useCallback(
    ({
      currentTarget,
    }:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>) => {
      setFormData({ ...formData, [currentTarget.name]: currentTarget.value });
      setValidationMessages([]);
    },
    [formData]
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      validateForm();
      if (!validateForm()) {
        event.preventDefault();
        return false;
      }

      event.preventDefault();
      dispatch(addUser(formData));
      setFormData(initialFormData);
    },
    [formData, dispatch]
  );

  const validateForm = () => {
    const { name, lastName, email, age, password, gender } = formData;
    let valid = false;
    const messages = [];
    if (!name || name.length < 2) {
      messages.push("Name should be at least 2 characters");
    }
    if (!lastName || lastName.length < 2) {
      messages.push("Last name should be at least 2 characters");
    }
    if (!email) {
      messages.push("Email is required");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      messages.push("Email is not valid");
    }

    if (!age) {
      messages.push("Age is required");
    }
    if (!password || !/\d/.test(password)) {
      messages.push("Password should include at least one number");
    }
    // if (!category) {
    //   messages.push("Category is required");
    // }
    if (!gender) {
      messages.push("Gender is required");
    }
    setValidationMessages(messages);
    if (messages.length === 0) {
      valid = true;
    }
    return valid;
  };

  return (
    <div className={styles.newUser}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <h1>New user form</h1>
        <div>
          <label htmlFor='name'>
            Name* <span>(No less than 2 characters)</span>
          </label>
          <input
            type='text'
            id='name'
            value={formData.name}
            name='name'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='lastName'>
            Last Name* <span>(No less than 2 characters)</span>
          </label>
          <input
            type='text'
            id='lastName'
            value={formData.lastName}
            name='lastName'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Email*</label>
          <input
            type='email'
            id='email'
            value={formData.email}
            name='email'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>
            Password* <span>(Should include at least one number)</span>
          </label>
          <input
            type='password'
            id='password'
            value={formData.password}
            name='password'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='age'>Age*</label>
          <input
            name='age'
            type='number'
            id='age'
            required
            value={formData.age || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='gender'>Gender*</label>
          <select
            id='gender'
            name='gender'
            value={formData.gender}
            required
            onChange={handleChange}
          >
            <option value=''></option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            name='category'
            value={formData.category}
            onChange={handleChange}
          >
            <option value=''></option>
            {categories?.map((category) => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        {validationMessages.map((vm: string) => (
          <p className={styles.error} key={vm}>
            {vm}
          </p>
        ))}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default NewUserForm;
