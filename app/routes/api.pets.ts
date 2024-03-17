import { json } from '@remix-run/node';
import { BlizzAPI } from 'blizzapi';
import { db } from 'db/connection.server';
import { pets as petsTable } from 'db/schema.server';

export async function loader() {
  const api = new BlizzAPI({
    region: 'us',
    clientId: process.env.BATTLE_NET_CLIENT_ID,
    clientSecret: process.env.BATTLE_NET_CLIENT_SECRET,
  });

  const petsData: any = await api.query(
    '/data/wow/pet/index?region=us&namespace=static-us'
  );

  for (const pet of petsData.pets) {
    const petData: any = await api.query(
      `/data/wow/pet/${pet.id}?region=us&namespace=static-us`
    );

    await db.insert(petsTable).values({
      externalId: petData.id,
      name: petData.name.en_US,
      description:
        'description' in petData && 'en_US' in petData.description
          ? petData.description.en_US
          : null,
      battlePetType: petData.battle_pet_type.type,
      creatureId: petData.creature.id,
      sourceType: 'source' in petData ? petData.source.type : null,
    });
  }

  return json({ success: true }, 200);
}
