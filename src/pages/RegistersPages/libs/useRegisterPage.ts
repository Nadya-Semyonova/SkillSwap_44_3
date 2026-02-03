import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@/store/store';

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

  const handleFinish = useCallback(() => {
    const finalSkillOff = buildSkillOff();
    dispatch(setSkillOff(finalSkillOff));
    setIsPreviewModalOpen(true);
  }, [buildSkillOff, dispatch]);

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

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        dispatch(setAvatar(dataUrl));
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

    input.onchange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;
      if (!files) return;

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          dispatch(setPhotos([e.target?.result as string]));
        };
        reader.readAsDataURL(file);
      });
    };

    input.click();
  };

  const step1Props: StepRegister1Props = {
    email: registration.email,
    password: registration.password,
    onEmailChange: (value) => dispatch(setEmail(value)),
    onPasswordChange: (value) => dispatch(setPassword(value)),
    onNext: () => setStep(2),
  };

  const step2Props: StepRegister2Props = {
    onNext: () => setStep(3),
    onBack: () => setStep(1),

    name: registration.name,
    onNameChange: (value) => dispatch(setName(value)),

    dateOfBirth: registration.dateOfBirth,
    onDateOfBirthChange: (value) => dispatch(setDateOfBirth(value)),

    gender: registration.gender,
    onGenderChange: (value) => dispatch(setGender(value)),

    city: registration.city,
    cities: safeCities,
    onCityChange: (value) => dispatch(setCity(value)),

    category: registration.learn_category,
    categories,
    onCategoryChange: handleLearnCategoryChange,

    subcategory: registration.learn_subcategory,
    subcategories: learnSubcategories,
    onSubcategoryChange: (value) => dispatch(setLearnSubcategory(value)),

    avatar: registration.avatar,
    setAvatar: handleClickImage,
  };

  const step3Props: StepRegister3Props = {
    onBack: () => setStep(2),
    onNext: handleFinish,

    skillName: registration.card_people.skill,
    onSkillNameChange: (value) => dispatch(setSkill(value)),

    category: registration.card_people.category,
    categories,
    onCategoryChange: handleTeachCategoryChange,

    subcategory: registration.card_people.subcategory,
    subcategories: teachSubcategories,
    onSubcategoryChange: (value) => dispatch(setSubcategory(value)),

    description: registration.card_people.description,
    onDescriptionChange: handleDescriptionChange,

    setPhotos: handleClickPhotos,
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
  };
}
