import React from "react";
import styles from "../styles/NewCategory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../app/features/categories/categories";
import { Users } from "./Category";
import Select from "react-select";

interface FormData {
  categoryName: string;
  subCategories: {
    name: string;
    subsubCategory: {
      subName: string;
      users: string[];
    }[];
  }[];
}

const initialFormData: FormData = {
  categoryName: "",
  subCategories: [
    {
      name: "",
      subsubCategory: [
        {
          subName: "",
          users: [],
        },
      ],
    },
  ],
};

const NewCategoryForm = () => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const dispatch = useDispatch();
  const { users } = useSelector((state: { users: Users }) => state.users);

  const handleCategoryNameChange = (e: any) => {
    setFormData({
      ...formData,
      categoryName: e.target.value,
    });
  };

  const handleSubCategoryNameChange = (e: any, index: number) => {
    const newSubCategories = [...formData.subCategories];
    newSubCategories[index].name = e.target.value;
    setFormData({
      ...formData,
      subCategories: newSubCategories,
    });
  };

  const handleSubSubCategoryNameChange = (
    e: any,
    subIndex: number,
    index: number
  ) => {
    const newSubCategories = [...formData.subCategories];
    newSubCategories[index].subsubCategory[subIndex].subName = e.target.value;
    setFormData({
      ...formData,
      subCategories: newSubCategories,
    });
  };

  const handleUserIdChange = (e: any, subIndex: number, index: number) => {
    const newSubCategories = [...formData.subCategories];
    newSubCategories[index].subsubCategory[subIndex].users = e.map(
      (u: any) => u.value
    );
    setFormData({
      ...formData,
      subCategories: newSubCategories,
    });
  };

  const handleAddSubCategory = () => {
    const newSubCategories = [...formData.subCategories];
    newSubCategories.push({
      name: "",
      subsubCategory: [
        {
          subName: "",
          users: [],
        },
      ],
    });
    setFormData({
      ...formData,
      subCategories: newSubCategories,
    });
  };

  const handleAddSubSubCategory = (index: number) => {
    const newSubCategories = [...formData.subCategories];
    newSubCategories[index].subsubCategory.push({
      subName: "",
      users: [],
    });
    setFormData({
      ...formData,
      subCategories: newSubCategories,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform form validation here
    setFormData(initialFormData);
    dispatch(addCategory(formData));
  };

  const removeSubCategory = (index: number) => {
    const newSubCategories = [...formData.subCategories];
    newSubCategories.splice(index, 1);
    setFormData({
      ...formData,
      subCategories: newSubCategories,
    });
  };

  const removeSubSubCategory = (index: number, subSubIndex: number) => {
    const newSubCategories = [...formData.subCategories];
    const subSubCategories = [...newSubCategories[index].subsubCategory];
    subSubCategories.splice(subSubIndex, 1);
    newSubCategories[index].subsubCategory = subSubCategories;
    setFormData({
      ...formData,
      subCategories: newSubCategories,
    });
  };

  const options = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  // TODO: Add validation
  // TODO: Add remove sub-category
  // TODO: use simple select for users not a library
  // TODO: only two sub categories are allowed
  // TODO: use rect.memo, react.useCallback
  // TODO: enumarate sub-categories and sub-sub categories according to the index
  // think about unpdating users category field with category id that user is assigned to
  // TODO: disable add sub-category when sub-category legth is 2
  return (
    <div className={styles.newCategory}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.categoryName}>
          <label htmlFor='category-name'>Category Name:</label>
          <input
            id='category-name'
            type='text'
            value={formData.categoryName}
            onChange={handleCategoryNameChange}
          />
        </div>
        {formData.subCategories.map((subCategory, index) => (
          <div key={`sub-category-${index}`} className={styles.subCategory}>
            <label htmlFor={`sub-category-${index}-name`}>Sub-Category:</label>
            <input
              id={`sub-category-${index + 1}-name`}
              type='text'
              value={subCategory.name}
              onChange={(e) => handleSubCategoryNameChange(e, index)}
            />
            {subCategory.subsubCategory.map((subSubCategory, subIndex) => (
              <div key={`sub-sub-category-${subIndex}`}>
                <label htmlFor={`sub-sub-category-${subIndex}-name`}>
                  Sub-Sub-Category:
                </label>
                <input
                  id={`sub-sub-category-${subIndex + 1}-name`}
                  type='text'
                  value={subSubCategory.subName}
                  onChange={(e) =>
                    handleSubSubCategoryNameChange(e, subIndex, index)
                  }
                />
                <Select
                  options={options}
                  isMulti
                  placeholder='Select users'
                  onChange={(e) => handleUserIdChange(e, subIndex, index)}
                />
              </div>
            ))}
            <button
              type='button'
              onClick={() => handleAddSubSubCategory(index)}
            >
              Add sub-sub categories
            </button>
            <button
              type='button'
              onClick={() => removeSubSubCategory(index, index)}
            >
              Remove sub-sub categories
            </button>
          </div>
        ))}
        <button type='button' onClick={handleAddSubCategory}>
          Add sub-category
        </button>
        {/* <button type='button' onClick={() => removeSubCategory(index)}>
          Remove sub-category
        </button> */}
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default NewCategoryForm;
