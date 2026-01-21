import { useState } from 'react';
import CitySelector from '@/features/auth/registration/ui/UserSelector/components/CitySelector';
import GenderSelector from '@/features/auth/registration/ui/UserSelector/components/GenderSelector';
import type { ICity, IGender } from '@/types/types';

export function TestPage() {
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [selectedGender, setSelectedGender] = useState<IGender | null>(null);

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Тестирование компонентов</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>CitySelector</h2>
        <CitySelector selectedCity={selectedCity} onSelect={setSelectedCity} />
        <div style={{ marginTop: '10px', color: '#666' }}>
          Выбранный город: {selectedCity ? selectedCity.name : 'Не выбран'}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>GenderSelector</h2>
        <GenderSelector selectedGender={selectedGender} onSelect={setSelectedGender} />
        <div style={{ marginTop: '10px', color: '#666' }}>
          Выбранный пол: {selectedGender ? selectedGender.name : 'Не выбран'}
        </div>
      </div>
    </div>
  );
}
