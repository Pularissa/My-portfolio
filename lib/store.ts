/**
 * Simple runtime store.
 * Reads from data.ts as defaults.
 * In-memory edits are applied immediately and survive hot-reload in dev.
 * For true persistence across restarts, connect a database (e.g. Neon, Supabase).
 */

import {
  projects   as defaultProjects,
  skillCategories as defaultSkills,
  experiences as defaultExperiences,
  profile    as defaultProfile,
  type Project,
  type SkillCategory,
  type ExperienceItem,
  type Profile,
} from './data';

// Node global trick so the store survives Next.js hot-reload in dev
declare global {
  // eslint-disable-next-line no-var
  var __portfolioStore: {
    projects:    Project[];
    skills:      SkillCategory[];
    experiences: ExperienceItem[];
    profile:     Profile;
  } | undefined;
}

if (!global.__portfolioStore) {
  global.__portfolioStore = {
    projects:    JSON.parse(JSON.stringify(defaultProjects)),
    skills:      JSON.parse(JSON.stringify(defaultSkills)),
    experiences: JSON.parse(JSON.stringify(defaultExperiences)),
    profile:     JSON.parse(JSON.stringify(defaultProfile)),
  };
}

export const store = global.__portfolioStore!;
