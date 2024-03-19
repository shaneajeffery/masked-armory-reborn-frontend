import { json } from '@remix-run/node';
import { BlizzAPI } from 'blizzapi';
import { db } from 'db/connection.server';
import { titles as titlesTable } from 'db/schema.server';

export async function loader() {
  const api = new BlizzAPI({
    region: 'us',
    clientId: process.env.BATTLE_NET_CLIENT_ID,
    clientSecret: process.env.BATTLE_NET_CLIENT_SECRET,
  });

  const titlesData: any = await api.query(
    '/data/wow/title/index?region=us&namespace=static-us'
  );

  for (const title of titlesData.titles) {
    await db.insert(titlesTable).values({
      externalId: title.id,
      name: title.name.en_US,
    });
  }

  return json({ success: true }, 200);
}
