import { createDictionary } from '../../utils/createDictionary';

export const messages = createDictionary('skills', {
  title: 'My Skills',
  subtitle: 'Technologies I work with',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & Others',
  proficiency: 'Proficiency: {level}%',
  yearsExperience: '{years} years',
  expert: 'Expert',
  advanced: 'Advanced',
  intermediate: 'Intermediate',
  beginner: 'Beginner',
});