import { BlizzAPI } from 'blizzapi';
import { db } from 'db/connection.server';
import {
  usRealms as usRealmsTable,
  euRealms as euRealmsTable,
} from 'db/schema.server';
import { json } from '@remix-run/node';

export async function loader() {
  // Import all US servers.
  const usApi = new BlizzAPI({
    region: 'us',
    clientId: process.env.BATTLE_NET_CLIENT_ID,
    clientSecret: process.env.BATTLE_NET_CLIENT_SECRET,
  });

  const usRealms: any = await usApi.query(
    '/data/wow/realm/index?region=us&namespace=dynamic-us'
  );

  for (const realm of usRealms.realms) {
    await db.insert(usRealmsTable).values({
      externalId: realm.id,
      name: realm.name.en_US,
      slug: realm.slug,
    });
  }

  // Import all EU servers.
  const euApi = new BlizzAPI({
    region: 'eu',
    clientId: process.env.BATTLE_NET_CLIENT_ID,
    clientSecret: process.env.BATTLE_NET_CLIENT_SECRET,
  });

  const euRealms: any = await euApi.query(
    '/data/wow/realm/index?region=eu&namespace=dynamic-eu'
  );

  for (const realm of euRealms.realms) {
    await db.insert(euRealmsTable).values({
      externalId: realm.id,
      name: realm.name.en_US,
      slug: realm.slug,
    });
  }

  return json({ success: true }, 200);
}
