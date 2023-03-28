export interface User {
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

export interface CategoryFormData {
  categoryName: string;
  subCategories: {
    name: string;
    subsubCategory: {
      subName: string;
      users: string[];
    }[];
  }[];
}

export interface UserFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  category: string;
}
