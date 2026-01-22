// import SkillsSelector from '@/widgets/SkillsSelector/SkillsSelector';
import { RegistrationStep3 } from '@/features/auth/registration/ui';
import HeaderRegister from '@/features/auth/registration/ui/HeaderRegistration/headerRegistration';

export function TestPage() {
  return (
    <>
      <HeaderRegister />
      <RegistrationStep3 />
      {/* <SkillsSelector /> */}
    </>
  );
}
