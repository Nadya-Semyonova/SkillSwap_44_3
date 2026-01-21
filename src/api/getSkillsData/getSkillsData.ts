import type { ISkillItem } from '@/types/types';

const response = await fetch('/db/skills.json');
const skills = await response.json();

const fetchSkillsApi = async (): Promise<ISkillItem> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return skills as ISkillItem;
};

export default fetchSkillsApi;
