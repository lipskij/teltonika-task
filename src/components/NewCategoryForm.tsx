import React from "react";
import styles from "../styles/NewCategory.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../app/features/categories/categories";
import { Users, CategoryFormData } from "../types/types";
import Select from "react-select";

const initialFormData: CategoryFormData = {
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
  const [formData, setFormData] =
    React.useState<CategoryFormData>(initialFormData);
  const [validationMessages, setValidationMessages] = React.useState<string[]>(
    []
  );
  const dispatch = useDispatch();
  const { users } = useSelector((state: { users: Users }) => state.users);

  const handleCategoryNameChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        categoryName: e.currentTarget.value,
      });
      setValidationMessages([]);
    },
    [formData]
  );

  const handleSubCategoryNameChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>, index: number) => {
      const newSubCategories = [...formData.subCategories];
      newSubCategories[index].name = e.currentTarget.value;
      setFormData({
        ...formData,
        subCategories: newSubCategories,
      });
      setValidationMessages([]);
    },
    [formData]
  );

  const handleSubSubCategoryNameChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>, subIndex: number, index: number) => {
      const newSubCategories = [...formData.subCategories];
      newSubCategories[index].subsubCategory[subIndex].subName =
        e.currentTarget.value;
      setFormData({
        ...formData,
        subCategories: newSubCategories,
      });
      setValidationMessages([]);
    },
    [formData]
  );

  const handleUserIdChange = React.useCallback(
    (e: any, subIndex: number, index: number) => {
      const newSubCategories = [...formData.subCategories];
      newSubCategories[index].subsubCategory[subIndex].users = e.map(
        (u: { value: string }) => u.value
      );
      setFormData({
        ...formData,
        subCategories: newSubCategories,
      });
      setValidationMessages([]);
    },
    [formData]
  );

  const handleAddSubCategory = React.useCallback(() => {
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
  }, [formData]);

  const handleAddSubSubCategory = React.useCallback(
    (index: number) => {
      const newSubCategories = [...formData.subCategories];
      newSubCategories[index].subsubCategory.push({
        subName: "",
        users: [],
      });
      setFormData({
        ...formData,
        subCategories: newSubCategories,
      });
    },
    [formData]
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      if (validateFormData(formData)) {
        e.preventDefault();
        return false;
      }
      e.preventDefault();
      dispatch(addCategory(formData));
      setFormData(initialFormData);
    },
    [formData, dispatch]
  );

  const removeSubCategory = React.useCallback(
    (index: number) => {
      const newSubCategories = [...formData.subCategories];
      newSubCategories.splice(index, 1);
      setFormData({
        ...formData,
        subCategories: newSubCategories,
      });
    },
    [formData]
  );

  const removeSubSubCategory = React.useCallback(
    (index: number, subSubIndex: number) => {
      const newSubCategories = [...formData.subCategories];
      const subSubCategories = [...newSubCategories[index].subsubCategory];
      subSubCategories.splice(subSubIndex, 1);
      newSubCategories[index].subsubCategory = subSubCategories;
      setFormData({
        ...formData,
        subCategories: newSubCategories,
      });
    },
    [formData]
  );

  function validateFormData(formData: CategoryFormData) {
    const errors: {
      categoryName?: string;
      subCategories?: {
        [key: number]: {
          name?: string;
          subsubCategory?: {
            [key: number]: {
              subName?: string;
            };
          };
        };
      };
    } = {};

    const errorMessages: string[] = [];

    if (!formData.categoryName.trim()) {
      errors.categoryName = "Category name is required.";
      errorMessages.push("Category name is required.");
    }

    if (!formData.subCategories || formData.subCategories.length === 0) {
      errors.subCategories = {
        0: {
          name: "At least one subcategory is required.",
        },
      };
      errorMessages.push("At least one subcategory is required.");
    } else {
      const subCategoriesErrors: {
        [key: number]: {
          name?: string;
          subsubCategory?: {
            [key: number]: {
              subName?: string;
            };
          };
        };
      } = {};

      formData.subCategories.forEach((subCategory, subCategoryIndex) => {
        if (!subCategory.name.trim()) {
          subCategoriesErrors[subCategoryIndex] = {
            name: "Subcategory name is required.",
          };
          errorMessages.push(
            `Subcategory ${subCategoryIndex + 1} name is required.`
          );
        }

        if (
          !subCategory.subsubCategory ||
          subCategory.subsubCategory.length === 0
        ) {
          subCategoriesErrors[subCategoryIndex] = {
            ...subCategoriesErrors[subCategoryIndex],
            subsubCategory: {
              0: {
                subName: "At least one sub-sub category is required.",
              },
            },
          };
          errorMessages.push(
            `At least one sub-sub category is required for subcategory ${
              subCategoryIndex + 1
            }.`
          );
        } else {
          const subsubCategoryErrors: {
            [key: number]: {
              subName?: string;
              users?: string;
            };
          } = {};

          subCategory.subsubCategory.forEach(
            (subsubCategory, subsubCategoryIndex) => {
              if (!subsubCategory.subName.trim()) {
                subsubCategoryErrors[subsubCategoryIndex] = {
                  subName: "Sub-sub category name is required.",
                };
                errorMessages.push(
                  `Sub-sub category ${
                    subsubCategoryIndex + 1
                  } name is required for subcategory ${subCategoryIndex + 1}.`
                );
              }

              if (!subsubCategory.users || subsubCategory.users.length === 0) {
                subsubCategoryErrors[subsubCategoryIndex] = {
                  ...subsubCategoryErrors[subsubCategoryIndex],
                  users: "At least one user is required.",
                };
                errorMessages.push(
                  `At least one user is required for sub-sub category ${
                    subsubCategoryIndex + 1
                  } of subcategory ${subCategoryIndex + 1}.`
                );
              }
            }
          );

          if (Object.keys(subsubCategoryErrors).length > 0) {
            subCategoriesErrors[subCategoryIndex] = {
              ...subCategoriesErrors[subCategoryIndex],
              subsubCategory: subsubCategoryErrors,
            };
          }
        }
      });

      if (Object.keys(subCategoriesErrors).length > 0) {
        errors.subCategories = subCategoriesErrors;
      }
    }

    setValidationMessages(errorMessages);

    return errors;
  }

  const options = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  // TODO: use simple select for users not a library
  // think about unpdating users category field with category id that user is assigned to

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
            <label htmlFor={`sub-category-${index}-name`}>
              Sub-Category {index + 1}:
            </label>
            <input
              id={`sub-category-${index + 1}-name`}
              type='text'
              value={subCategory.name}
              onChange={(e) => handleSubCategoryNameChange(e, index)}
            />
            {subCategory.subsubCategory.map((subSubCategory, subIndex) => (
              <div key={`sub-sub-category-${subIndex}`}>
                <label htmlFor={`sub-sub-category-${subIndex}-name`}>
                  Sub-Sub-Category {subIndex + 1}:
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
              onClick={handleAddSubCategory}
              disabled={formData.subCategories.length === 2}
            >
              Add sub-category
            </button>
            <button
              type='button'
              onClick={() => removeSubCategory(index)}
              disabled={formData.subCategories.length === 1}
            >
              Remove sub-category
            </button>

            <button
              type='button'
              onClick={() => handleAddSubSubCategory(index)}
            >
              Add sub-sub categories
            </button>
            <button
              type='button'
              onClick={() => removeSubSubCategory(index, index)}
              disabled={subCategory.subsubCategory.length === 1}
            >
              Remove sub-sub categories
            </button>
          </div>
        ))}

        {validationMessages.map((message, index) => (
          <p className={styles.error} key={`validation-message-${index}`}>
            {message}
          </p>
        ))}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default NewCategoryForm;
