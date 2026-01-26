import { Input } from '@shared/ui/useInput';
import HeaderAuth from '@/pages/RegistersPages/HeaderRegister/HeaderRegister';
import { UserSelector } from '@/features/auth/UserCalendar/UserSelector';
import Header from '@/features/header/header';
import AboutProject from '@/shared/ui/AllButtons/AboutProject/AboutProject';
import Logotype from '@/shared/ui/Logotype';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';

export function TestPage() {
  return (
    <>
      <HeaderAuth currentStep={0} />
      <Input />
      <UserSelector />
      <Header />
      <Logotype />
      <AboutProject />
      <ProfilePage />
    </>
  );
}
