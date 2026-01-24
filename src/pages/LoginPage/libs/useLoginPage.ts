import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants/routes';
import { useDispatch, useSelector } from '@/store/store';
import { getUserInfoData, clearError } from '@/store/slices/authSlice/authSlice';
import { LOGIN_TEXTS } from './LoginTexts';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  credentials?: string;
}

export const useLoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: authError } = useSelector((state) => state.auth);

  // Очистка ошибок при изменении полей
  useEffect(() => {
    if (formData.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (formData.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  }, [formData.email, formData.password]);

  // Обработка ошибок авторизации
  useEffect(() => {
    if (authError) {
      setErrors((prev) => ({ ...prev, credentials: LOGIN_TEXTS.error.invalidCredentials }));
      dispatch(clearError());
    }
  }, [authError, dispatch]);

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    // Валидация email
    if (!formData.email.trim()) {
      newErrors.email = LOGIN_TEXTS.error.requiredEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = LOGIN_TEXTS.error.invalidEmail;
    }

    // Валидация пароля
    if (!formData.password.trim()) {
      newErrors.password = LOGIN_TEXTS.error.requiredPassword;
    } else if (formData.password.length < 6) {
      newErrors.password = LOGIN_TEXTS.error.minPasswordLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(getUserInfoData(formData)).unwrap();
      navigate(ROUTES.PROFILE);
    } catch (error) {
      // Ошибка уже обрабатывается в useEffect выше
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof LoginForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClickEye = () => {
    setShowPass(!showPass);
  };

  return {
    formData,
    errors,
    showPass,
    isSubmitting,
    isLoading: loading,
    texts: LOGIN_TEXTS,
    handleChange,
    handleSubmit,
    handleClickEye,
  };
};
