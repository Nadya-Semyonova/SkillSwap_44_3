import HeaderRegister from '@features/auth/registration/ui/HeaderRegistration/headerRegistration';
import { RegistrationStep3 } from '@features/auth/registration/ui';
import CardPhoto from '@/widgets/CardPhoto';
import { MOCK_FOR_CARDPHOTO_COMPONENT } from '@/widgets/CardPhoto/Mock';

export function TestPage() {
  return (
    <>
      <HeaderRegister />
      <RegistrationStep3 />
      <CardPhoto
        user={MOCK_FOR_CARDPHOTO_COMPONENT}
        onLike={() => undefined}
        onShare={() => undefined}
        onMoreDetails={() => undefined}
        onExchange={() => undefined}
        isOwner={false}
        requestSent={false}
      />
    </>
  );
}
