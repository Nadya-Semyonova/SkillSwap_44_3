import { useState } from 'react';
import DateOfBirthSelector from './DateOfBirthSelector/DateOfBirthSelector';

export function UserSelector() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  return <DateOfBirthSelector value={birthDate} onChange={setBirthDate} placeholder="дд.мм.гггг" />;
}
