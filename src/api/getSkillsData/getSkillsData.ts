import skills from '@public/db/skills.json';
import type { ISkillItem } from '@/types/types';

const fetchSkillsApi = async (): Promise<ISkillItem> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return skills as ISkillItem;
};

export default fetchSkillsApi;
