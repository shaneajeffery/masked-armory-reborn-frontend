import { json } from '@remix-run/node';
import { BlizzAPI } from 'blizzapi';
import { db } from 'db/connection.server';
import { toys as toysTable } from 'db/schema.server';

export async function loader() {
  const api = new BlizzAPI({
    region: 'us',
    clientId: process.env.BATTLE_NET_CLIENT_ID,
    clientSecret: process.env.BATTLE_NET_CLIENT_SECRET,
  });

  const toysData: any = await api.query(
    '/data/wow/toy/index?region=us&namespace=static-us'
  );

  for (const toy of toysData.toys) {
    const toyData: any = await api.query(
      `/data/wow/toy/${toy.id}?region=us&namespace=static-us`
    );

    await db.insert(toysTable).values({
      externalId: toyData.id,
      name: toyData.item.name.en_US,
      itemId: toyData.item.id,
      sourceType: 'source' in toyData ? toyData.source.type : null,
    });
  }

  return json({ success: true }, 200);
}
