import HeaderRegister from '../../shared/ui/HeaderAuth/HeaderRegister';
import StepRegister1 from './StepRegister/StepRegister1';
import StepRegister2 from './StepRegister/StepRegister2';
import StepRegister3 from './StepRegister/StepRegister3';

import { ModalWithOverlay } from '@/shared/ui/modalWithOverlay';
import { PreviewModal } from '@/shared/ui/modal';
import { InfoModal } from '@/shared/ui/modal/infoModal';

import { useRegisterPage } from '@/pages/RegistersPages/libs/useRegisterPage';

export default function RegisterPage() {
  const {
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
  } = useRegisterPage();

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
          avatar={step2Props.avatar}
          setAvatar={step2Props.setAvatar}
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
          setPhotos={step3Props.setPhotos}
          photos={step3Props.photos}
        />
      );
    }

    return null;
  };

  return (
    <>
      <HeaderRegister currentStep={step} />
      {renderStep()}

      {/* Модальное окно предпросмотра */}
      <ModalWithOverlay isOpen={isPreviewModalOpen} onClose={handleEditProfile}>
        <PreviewModal
          userData={previewData}
          onEdit={handleEditProfile}
          onSave={handleSaveProfile}
        />
      </ModalWithOverlay>

      {/* Модальное окно успешного сохранения */}
      <ModalWithOverlay isOpen={isSuccessModalOpen} onClose={handleSuccessConfirm}>
        <InfoModal
          title="Ваше предложение создано."
          message="Теперь вы можете предложить обмен."
          onConfirm={handleSuccessConfirm}
        />
      </ModalWithOverlay>
    </>
  );
}
