import { useEffect, useState } from 'react';
import HeaderRegister from '../../shared/ui/HeaderAuth/HeaderRegister';
import StepRegister1 from './StepRegister/StepRegister1';
import StepRegister2 from './StepRegister/StepRegister2';
import StepRegister3 from './StepRegister/StepRegister3';

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
} from '@/store/slices/registerUserSlice.ts/registerUserSlice';

import { getCitiesData, getSkillsData } from '@/store/slices/userDataSlice/userDataSlice';

type RegisterStep = 0 | 1 | 2 | 3;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [step, setStep] = useState<RegisterStep>(1);

  const registration = useSelector((state) => state.registration);
  const cities = useSelector((state) => state.users.cities);
  const skills = useSelector((state) => state.users.skills);

  useEffect(() => {
    if (!cities) dispatch(getCitiesData());
    if (!skills) dispatch(getSkillsData());
  }, [cities, skills, dispatch]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepRegister1
            email={registration.email}
            password={registration.password}
            onEmailChange={(value: string) => dispatch(setEmail(value))}
            onPasswordChange={(value: string) => dispatch(setPassword(value))}
            onNext={() => setStep(2)}
          />
        );

      case 2: {
        const safeCities = cities ?? [];
        const categories = skills ? Object.keys(skills) : [];
        const subcategories =
          skills && registration.card_people.category
            ? (skills[registration.card_people.category] ?? [])
            : [];

        return (
          <StepRegister2
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            name={registration.name}
            onNameChange={(value: string) => dispatch(setName(value))}
            dateOfBirth={registration.dateOfBirth}
            onDateOfBirthChange={(value: string) => dispatch(setDateOfBirth(value))}
            gender={registration.gender}
            onGenderChange={(value: string) => dispatch(setGender(value))}
            city={registration.city}
            cities={safeCities}
            onCityChange={(value: string) => dispatch(setCity(value))}
            category={registration.card_people.category}
            categories={categories}
            onCategoryChange={(value: string) => {
              dispatch(setCategory(value));
              dispatch(setSubcategory(''));
            }}
            subcategory={registration.card_people.subcategory}
            subcategories={subcategories}
            onSubcategoryChange={(value: string) => dispatch(setSubcategory(value))}
          />
        );
      }

      case 3: {
        const categories = skills ? Object.keys(skills) : [];
        const subcategories =
          skills && registration.card_people.category
            ? (skills[registration.card_people.category] ?? [])
            : [];

        const handleFinish = () => {
          console.log('REGISTER DATA:', registration);
        };

        return (
          <StepRegister3
            onBack={() => setStep(2)}
            onNext={handleFinish}
            skillName={registration.card_people.skill}
            onSkillNameChange={(value: string) => dispatch(setSkill(value))}
            category={registration.card_people.category}
            categories={categories}
            onCategoryChange={(value: string) => {
              dispatch(setCategory(value));
              dispatch(setSubcategory(''));
            }}
            subcategory={registration.card_people.subcategory}
            subcategories={subcategories}
            onSubcategoryChange={(value: string) => dispatch(setSubcategory(value))}
            description={registration.card_people.description}
            onDescriptionChange={(value: string) => dispatch(setDescription(value))}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <>
      <HeaderRegister currentStep={step} />
      {renderStep()}
    </>
  );
}
