export type RegisterStep = 1 | 2 | 3;

export interface StepRegister1Props {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNext: () => void;
  errors?: { email?: string; password?: string }; // ДОБАВЛЕНО
}

export interface StepRegister2Props {
  onNext: () => void;
  onBack: () => void;

  name: string;
  onNameChange: (value: string) => void;

  dateOfBirth: string;
  onDateOfBirthChange: (value: string) => void;

  gender: string;
  onGenderChange: (value: string) => void;

  city: string;
  cities: string[];
  onCityChange: (value: string) => void;

  category: string;
  categories: string[];
  onCategoryChange: (value: string) => void;

  subcategory: string;
  subcategories: string[];
  onSubcategoryChange: (value: string) => void;

  avatar: string;
  setAvatar: () => void;
  errors?: {
    // ДОБАВЛЕНО
    name?: string;
    dateOfBirth?: string;
    gender?: string;
    city?: string;
    category?: string;
    subcategory?: string;
  };
}

export interface StepRegister3Props {
  onBack: () => void;
  onNext: () => void;

  skillName: string;
  onSkillNameChange: (value: string) => void;

  category: string;
  categories: string[];
  onCategoryChange: (value: string) => void;

  subcategory: string;
  subcategories: string[];
  onSubcategoryChange: (value: string) => void;

  description: string;
  onDescriptionChange: (value: string) => void;

  setPhotos: () => void;
  photos: string[];
  errors?: {
    // ДОБАВЛЕНО
    skillName?: string;
    category?: string;
    subcategory?: string;
    description?: string;
  };
}
