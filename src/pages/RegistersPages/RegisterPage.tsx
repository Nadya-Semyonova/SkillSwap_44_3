import { useEffect } from 'react';
import HeaderRegister from '../../shared/ui/HeaderAuth/HeaderRegister';
import StepRegister1 from './StepRegister/StepRegister1';
import StepRegister2 from './StepRegister/StepRegister2';
import StepRegister3 from './StepRegister/StepRegister3';

import { useRegisterPage } from '@/pages/RegistersPages/libs/useRegisterPage';

export default function RegisterPage() {
  const { step, step1Props, step2Props, step3Props, finishData } = useRegisterPage();

  useEffect(() => {
    if (finishData) {
      console.log('REGISTER DATA:', finishData);
    }
  }, [finishData]);

  const renderStep = () => {
    if (step === 1) {
      return (
        <StepRegister1
          email={step1Props.email}
          password={step1Props.password}
          onEmailChange={step1Props.onEmailChange}
          onPasswordChange={step1Props.onPasswordChange}
          onNext={step1Props.onNext}
        />
      );
    }

    if (step === 2) {
      return (
        <StepRegister2
          onNext={step2Props.onNext}
          onBack={step2Props.onBack}
          name={step2Props.name}
          onNameChange={step2Props.onNameChange}
          dateOfBirth={step2Props.dateOfBirth}
          onDateOfBirthChange={step2Props.onDateOfBirthChange}
          gender={step2Props.gender}
          onGenderChange={step2Props.onGenderChange}
          city={step2Props.city}
          cities={step2Props.cities}
          onCityChange={step2Props.onCityChange}
          category={step2Props.category}
          categories={step2Props.categories}
          onCategoryChange={step2Props.onCategoryChange}
          subcategory={step2Props.subcategory}
          subcategories={step2Props.subcategories}
          onSubcategoryChange={step2Props.onSubcategoryChange}
        />
      );
    }

    if (step === 3) {
      return (
        <StepRegister3
          onBack={step3Props.onBack}
          onNext={step3Props.onNext}
          skillName={step3Props.skillName}
          onSkillNameChange={step3Props.onSkillNameChange}
          category={step3Props.category}
          categories={step3Props.categories}
          onCategoryChange={step3Props.onCategoryChange}
          subcategory={step3Props.subcategory}
          subcategories={step3Props.subcategories}
          onSubcategoryChange={step3Props.onSubcategoryChange}
          description={step3Props.description}
          onDescriptionChange={step3Props.onDescriptionChange}
        />
      );
    }

    return null;
  };

  return (
    <>
      <HeaderRegister currentStep={step} />
      {renderStep()}
    </>
  );
}
