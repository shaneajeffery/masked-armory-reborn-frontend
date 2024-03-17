import { BlizzAPI } from 'blizzapi';
import { db } from 'db/connection';
import { mounts as mountsTable } from 'db/schema';

export async function loader() {
  const api = new BlizzAPI({
    region: 'us',
    clientId: process.env.BATTLE_NET_CLIENT_ID,
    clientSecret: process.env.BATTLE_NET_CLIENT_SECRET,
  });

  const mountsData: any = await api.query(
    '/data/wow/mount/index?region=us&namespace=static-us'
  );

  for (const mount of mountsData.mounts) {
    const mountData: any = await api.query(
      `/data/wow/mount/${mount.id}?region=us&namespace=static-us`
    );

    await db.insert(mountsTable).values({
      externalId: mountData.id,
      name: mountData.name.en_US,
      description:
        'description' in mountData && 'en_US' in mountData.description
          ? mountData.description.en_US
          : null,
      creatureDisplayId: mountData.creature_displays[0].id,
      sourceType: 'source' in mountData ? mountData.source.type : null,
    });
  }

  return Response.json({});
}
