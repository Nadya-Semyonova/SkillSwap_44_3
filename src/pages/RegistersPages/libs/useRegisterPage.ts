import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@/store/store';
import { validateStep1, validateStep2, validateStep3 } from './validation';

import {
  setEmail,
  setPassword,
  setName,
  setDateOfBirth,
  setGender,
  setCity,
  setCategory,
  setSubcategory,
  setSkill,
  setDescription,
  setAbout,
  setLearnCategory,
  setLearnSubcategory,
  setSkillOff,
  registerUser,
  setAvatar,
  setPhotos,
} from '@/store/slices/registerUserSlice.ts/registerUserSlice';

import { getCitiesData, getSkillsData } from '@/store/slices/userDataSlice/userDataSlice';

import type {
  RegisterStep,
  StepRegister1Props,
  StepRegister2Props,
  StepRegister3Props,
} from '@/pages/RegistersPages/libs/types';

import type { IUser } from '@/types/types';

export function useRegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState<RegisterStep>(1);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // проверка 1-3:
  const [step1Errors, setStep1Errors] = useState<{ email?: string; password?: string }>({});
  const [step2Errors, setStep2Errors] = useState<{
    name?: string;
    dateOfBirth?: string;
    gender?: string;
    city?: string;
    category?: string;
    subcategory?: string;
  }>({});
  const [step3Errors, setStep3Errors] = useState<{
    skillName?: string;
    category?: string;
    subcategory?: string;
    description?: string;
  }>({});

  const registration = useSelector((state) => state.registration);
  const cities = useSelector((state) => state.users.cities);
  const skills = useSelector((state) => state.users.skills);

  useEffect(() => {
    if (!cities) dispatch(getCitiesData());
    if (!skills) dispatch(getSkillsData());
  }, [cities, skills, dispatch]);

  const safeCities = useMemo(() => cities ?? [], [cities]);

  const categories = useMemo(() => {
    if (!skills) return [];
    return Object.keys(skills);
  }, [skills]);

  const teachCategory = registration.card_people.category;

  const learnSubcategories = useMemo(() => {
    if (!skills) return [];
    if (!registration.learn_category) return [];
    return skills[registration.learn_category] ?? [];
  }, [skills, registration.learn_category]);

  const teachSubcategories = useMemo(() => {
    if (!skills) return [];
    if (!teachCategory) return [];
    return skills[teachCategory] ?? [];
  }, [skills, teachCategory]);

  const handleLearnCategoryChange = useCallback(
    (value: string) => {
      dispatch(setLearnCategory(value));
      dispatch(setLearnSubcategory(''));
    },
    [dispatch]
  );

  const handleTeachCategoryChange = useCallback(
    (value: string) => {
      dispatch(setCategory(value));
      dispatch(setSubcategory(''));
    },
    [dispatch]
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      dispatch(setDescription(value));
      dispatch(setAbout(value));
    },
    [dispatch]
  );

  const buildSkillOff = useCallback(() => {
    const result: string[] = [];

    const learnValue = registration.learn_subcategory || registration.learn_category;
    if (learnValue) result.push(learnValue);

    const offerSkill = registration.card_people.skill.trim();
    if (offerSkill && !result.includes(offerSkill)) result.push(offerSkill);

    return result;
  }, [registration.card_people.skill, registration.learn_category, registration.learn_subcategory]);

  // Валидация для шага 1
  const handleNextStep1 = useCallback(() => {
    const validation = validateStep1(registration.email, registration.password);
    setStep1Errors(validation.errors);

    if (validation.isValid) {
      setStep(2);
      setStep1Errors({});
    }
  }, [registration.email, registration.password]);

  // Валидация для шага 2
  const handleNextStep2 = useCallback(() => {
    const validation = validateStep2(
      registration.name,
      registration.dateOfBirth,
      registration.gender,
      registration.city,
      registration.learn_category,
      registration.learn_subcategory
    );
    setStep2Errors(validation.errors);

    if (validation.isValid) {
      setStep(3);
      setStep2Errors({});
    }
  }, [
    registration.name,
    registration.dateOfBirth,
    registration.gender,
    registration.city,
    registration.learn_category,
    registration.learn_subcategory,
  ]);

  const handleFinish = useCallback(() => {
    const validation = validateStep3(
      registration.card_people.skill,
      registration.card_people.category,
      registration.card_people.subcategory,
      registration.card_people.description
    );
    setStep3Errors(validation.errors);

    if (validation.isValid) {
      const finalSkillOff = buildSkillOff();
      dispatch(setSkillOff(finalSkillOff));
      setIsPreviewModalOpen(true);
      setStep3Errors({});
    }
  }, [
    registration.card_people.skill,
    registration.card_people.category,
    registration.card_people.subcategory,
    registration.card_people.description,
    buildSkillOff,
    dispatch,
  ]);

  const handleEditProfile = useCallback(() => {
    setIsPreviewModalOpen(false);
  }, []);

  const handleSaveProfile = useCallback(async () => {
    try {
      await dispatch(registerUser()).unwrap();
      setIsPreviewModalOpen(false);
      setIsSuccessModalOpen(true);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch]);

  const handleSuccessConfirm = useCallback(() => {
    setIsSuccessModalOpen(false);
    navigate('/profile');
    window.location.reload();
  }, [navigate]);

  const previewData = useMemo(() => {
    const finalSkillOff = buildSkillOff();

    const userData: Omit<IUser, 'id' | 'liked' | 'age' | 'createdAt'> = {
      avatar: registration.avatar,
      name: registration.name,
      city: registration.city,
      dateOfBirth: registration.dateOfBirth,
      gender: registration.gender,
      email: registration.email,
      password: registration.password,
      about: registration.about,
      card_people: { ...registration.card_people },
      skill_off: finalSkillOff,
    };

    return userData;
  }, [registration, buildSkillOff]);

  const handleClickImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) {
        input.remove();
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        dispatch(setAvatar(dataUrl));
        input.value = '';
        input.remove();
      };
      reader.onerror = () => {
        input.value = '';
        input.remove();
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  const handleClickPhotos = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files ? Array.from(target.files) : [];
      if (files.length === 0) {
        input.remove();
        return;
      }

      const readFileAsDataUrl = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });

      Promise.all(files.map(readFileAsDataUrl))
        .then((dataUrls) => {
          dispatch(setPhotos(dataUrls));
        })
        // .catch((error) => {
        //   console.error('Ошибка загрузки изображений:', error);
        // })
        .finally(() => {
          input.value = '';
          input.remove();
        });
    };

    input.click();
  };

  const step1Props: StepRegister1Props = {
    email: registration.email,
    password: registration.password,
    onEmailChange: (value) => {
      dispatch(setEmail(value));

      const validation = validateStep1(value, registration.password);
      setStep1Errors(validation.errors);
    },
    onPasswordChange: (value) => {
      dispatch(setPassword(value));

      const validation = validateStep1(registration.email, value);
      setStep1Errors(validation.errors);
    },
    onNext: handleNextStep1,
    errors: step1Errors,
  };

  const step2Props: StepRegister2Props = {
    onNext: handleNextStep2,
    onBack: () => setStep(1),

    name: registration.name,
    onNameChange: (value) => {
      dispatch(setName(value));
      const validation = validateStep2(
        value,
        registration.dateOfBirth,
        registration.gender,
        registration.city,
        registration.learn_category,
        registration.learn_subcategory
      );
      setStep2Errors(validation.errors);
    },

    dateOfBirth: registration.dateOfBirth,
    onDateOfBirthChange: (value) => {
      dispatch(setDateOfBirth(value));
      const validation = validateStep2(
        registration.name,
        value,
        registration.gender,
        registration.city,
        registration.learn_category,
        registration.learn_subcategory
      );
      setStep2Errors(validation.errors);
    },

    gender: registration.gender,
    onGenderChange: (value) => {
      dispatch(setGender(value));
      const validation = validateStep2(
        registration.name,
        registration.dateOfBirth,
        value,
        registration.city,
        registration.learn_category,
        registration.learn_subcategory
      );
      setStep2Errors(validation.errors);
    },

    city: registration.city,
    cities: safeCities,
    onCityChange: (value) => {
      dispatch(setCity(value));
      const validation = validateStep2(
        registration.name,
        registration.dateOfBirth,
        registration.gender,
        value,
        registration.learn_category,
        registration.learn_subcategory
      );
      setStep2Errors(validation.errors);
    },

    category: registration.learn_category,
    categories,
    onCategoryChange: (value) => {
      handleLearnCategoryChange(value);
      const validation = validateStep2(
        registration.name,
        registration.dateOfBirth,
        registration.gender,
        registration.city,
        value,
        registration.learn_subcategory
      );
      setStep2Errors(validation.errors);
    },

    subcategory: registration.learn_subcategory,
    subcategories: learnSubcategories,
    onSubcategoryChange: (value) => {
      dispatch(setLearnSubcategory(value));
      const validation = validateStep2(
        registration.name,
        registration.dateOfBirth,
        registration.gender,
        registration.city,
        registration.learn_category,
        value
      );
      setStep2Errors(validation.errors);
    },

    avatar: registration.avatar,
    setAvatar: handleClickImage,
    errors: step2Errors,
  };

  const step3Props: StepRegister3Props = {
    onBack: () => setStep(2),
    onNext: handleFinish,

    skillName: registration.card_people.skill,
    onSkillNameChange: (value) => {
      dispatch(setSkill(value));
      if (step3Errors.skillName) setStep3Errors((prev) => ({ ...prev, skillName: undefined }));
    },

    category: registration.card_people.category,
    categories,
    onCategoryChange: (value) => {
      handleTeachCategoryChange(value);
      if (step3Errors.category) setStep3Errors((prev) => ({ ...prev, category: undefined }));
    },

    subcategory: registration.card_people.subcategory,
    subcategories: teachSubcategories,
    onSubcategoryChange: (value) => {
      dispatch(setSubcategory(value));
      if (step3Errors.subcategory) setStep3Errors((prev) => ({ ...prev, subcategory: undefined }));
    },

    description: registration.card_people.description,
    onDescriptionChange: (value) => {
      handleDescriptionChange(value);
      if (step3Errors.description) setStep3Errors((prev) => ({ ...prev, description: undefined }));
    },

    setPhotos: handleClickPhotos,
    photos: registration.card_people.photos ?? [],
    errors: step3Errors,
  };

  return {
    step,
    step1Props,
    step2Props,
    step3Props,
    isPreviewModalOpen,
    isSuccessModalOpen,
    previewData,
    handleEditProfile,
    handleSaveProfile,
    handleSuccessConfirm,
    step1Errors,
    step2Errors,
    step3Errors,
  };
}
