import {
  boolean,
  integer,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

export const usRealms = pgTable(
  'us_realms',
  {
    id: serial('id').primaryKey(),
    externalId: integer('external_id'),
    name: varchar('name', { length: 256 }),
    slug: varchar('slug', { length: 256 }),
  },
  (usRealms) => {
    return {
      nameIndex: uniqueIndex('name_idx').on(usRealms.name),
    };
  }
);

export const euRealms = pgTable(
  'eu_realms',
  {
    id: serial('id').primaryKey(),
    externalId: integer('external_id'),
    name: varchar('name', { length: 256 }),
    slug: varchar('slug', { length: 256 }),
  },
  (euRealms) => {
    return {
      nameIndex: uniqueIndex('name_idx').on(euRealms.name),
    };
  }
);

export const achievementCategories = pgTable(
  'achievement_categories',
  {
    id: serial('id').primaryKey(),
    externalId: integer('external_id'),
    name: varchar('name', { length: 256 }),
    achievementCount: integer('achievement_count'),
    parentExternalId: integer('parent_external_id'),
  },
  (achievementCategories) => {
    return {
      nameIndex: uniqueIndex('name_idx').on(achievementCategories.name),
    };
  }
);

export const achievements = pgTable(
  'achievements',
  {
    id: serial('id').primaryKey(),
    externalId: integer('external_id'),
    name: varchar('name', { length: 256 }),
    description: varchar('description', { length: 256 }),
    isAccountWide: boolean('is_account_wide'),
    displayOrder: integer('display_order'),
    externalCategoryId: integer('external_category_id'),
    points: integer('points'),
  },
  (achievements) => {
    return {
      nameIndex: uniqueIndex('name_idx').on(achievements.name),
    };
  }
);
