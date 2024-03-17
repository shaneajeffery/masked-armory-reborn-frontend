import { sql } from '@vercel/postgres';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';

import pg from 'pg';

export const db =
  process.env.NODE_ENV === 'production'
    ? drizzleVercel(sql)
    : drizzleNode(new pg.Pool({ connectionString: process.env.POSTGRES_URL }));