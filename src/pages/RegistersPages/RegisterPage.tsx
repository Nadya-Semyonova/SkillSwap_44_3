import { useState } from 'react';
import HeaderRegister from './HeaderRegister/HeaderRegister';
import StepRegister1 from './StepRegister/StepRegister1';
import StepRegister2 from './StepRegister/StepRegister2';
import StepRegister3 from './StepRegister/StepRegister3';
import styles from './RegisterPage.module.css';

type RegisterStep = 0 | 1 | 2 | 3;

export default function RegisterPage() {
  const [step, setStep] = useState<RegisterStep>(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepRegister1 onNext={() => setStep(2)} />;

      case 2:
        return <StepRegister2 onNext={() => setStep(3)} onBack={() => setStep(1)} />;

      case 3:
        return <StepRegister3 onBack={() => setStep(2)} />;

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <HeaderRegister currentStep={step} />
      {renderStep()}
    </div>
  );
}
