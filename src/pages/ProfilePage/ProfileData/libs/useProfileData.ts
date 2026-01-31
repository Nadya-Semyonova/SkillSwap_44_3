import { useState, useMemo } from 'react';
import { useDispatch, useSelector, type RootState } from '@/store/store';
import { profileText, genderOptions } from '@/pages/ProfilePage/ProfileData/ProfileDataConstants';
import { saveProfileEdit, setUserData } from '@/store/slices/profileEditSlice/profileEditSlice';
import type { IEditUser } from '@/types/types';

export function useProfileData() {
  const user = useSelector((state: RootState) => state.auth.user);
  const citiesData = useSelector((state: RootState) => state.users.cities);
  const cities = useMemo(() => citiesData || [], [citiesData]);

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
    user &&
    (email !== (user.email ?? '') ||
      name !== (user.name ?? '') ||
      bithDay !== (user.dateOfBirth ?? '') ||
      gender !== (user.gender ?? '') ||
      city !== (user.city ?? '') ||
      about !== (user.about ?? ''))
  );

  const handleClickSave = () => {
    const userEdit: IEditUser = {
      email,
      name,
      dateOfBirth: bithDay,
      gender,
      city,
      about,
    };
    dispatch(setUserData(userEdit));
    dispatch(saveProfileEdit());
    window.location.reload();
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
  };
}
