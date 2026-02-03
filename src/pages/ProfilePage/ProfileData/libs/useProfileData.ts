import { useState, useMemo } from 'react';
import { useDispatch, useSelector, type RootState } from '@/store/store';
import { profileText, genderOptions } from '@/pages/ProfilePage/ProfileData/ProfileDataConstants';
import { saveProfileEdit, setUserData } from '@/store/slices/profileEditSlice/profileEditSlice';
import type { IEditUser } from '@/types/types';

export function useProfileData() {
  const user = useSelector((state: RootState) => state.auth.user);
  const citiesData = useSelector((state: RootState) => state.users.cities);
  const cities = useMemo(() => citiesData || [], [citiesData]);

  const [avatar, setAvatar] = useState<string>(user?.avatar || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [name, setName] = useState<string>(user?.name || '');
  const [bithDay, setBirthDay] = useState<string>(user?.dateOfBirth || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [city, setCity] = useState(user?.city || '');
  const [about, setAbout] = useState(user?.about || '');
  const [emailEditable, setEmailEditable] = useState(false);
  const [nameEditable, setNameEditable] = useState(false);
  const [aboutEditable, setAboutEditable] = useState(false);
  const dispatch = useDispatch();

  const genderLabel = useMemo(
    () =>
      genderOptions.find((option) => option.value === gender)?.label ??
      profileText.genderPlaceholder,
    [gender]
  );

  const isGenderSelected = useMemo(() => Boolean(gender), [gender]);

  const cityPlaceholder = useMemo(() => city || profileText.cityPlaceholder, [city]);

  const buttonActive = Boolean(
    (user &&
      (email !== (user.email ?? '') ||
        name !== (user.name ?? '') ||
        bithDay !== (user.dateOfBirth ?? '') ||
        gender !== (user.gender ?? '') ||
        city !== (user.city ?? '') ||
        about !== (user.about ?? ''))) ||
    avatar !== (user?.avatar ?? '')
  );

  const handleClickSave = async () => {
    const userEdit: IEditUser = {
      avatar,
      email,
      name,
      dateOfBirth: bithDay,
      gender,
      city,
      about,
    };
    dispatch(setUserData(userEdit));
    try {
      await dispatch(saveProfileEdit()).unwrap();
      setEmailEditable(false);
      setNameEditable(false);
      setAboutEditable(false);
      window.location.reload();
    } catch {
      // Ошибка сохранения уже в state.profileEdit.error
    }
  };

  const avatarChange = () => {
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
        setAvatar(dataUrl);
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  return {
    user,
    email,
    setEmail,
    name,
    setName,
    bithDay,
    setBirthDay,
    gender,
    setGender,
    city,
    setCity,
    about,
    setAbout,
    cities,
    genderLabel,
    isGenderSelected,
    cityPlaceholder,
    buttonActive,
    handleClickSave,
    emailEditable,
    setEmailEditable,
    nameEditable,
    setNameEditable,
    aboutEditable,
    setAboutEditable,
    avatarChange,
    avatar,
  };
}
