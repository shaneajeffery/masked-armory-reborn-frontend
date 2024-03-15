import {
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
