import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from 'db/connection.server';
import { euRealms, usRealms } from 'db/schema.server';
import CreateProfile from '~/components/create-profile';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader() {
  const usRealmData = await db
    .select({ label: usRealms.name, value: usRealms.slug })
    .from(usRealms)
    .orderBy(usRealms.name);
  const euRealmData = await db
    .select({ label: euRealms.name, value: euRealms.slug })
    .from(euRealms)
    .orderBy(euRealms.name);

  return json({
    usRealmData,
    euRealmData,
  });
}

export default function Index() {
  const { usRealmData, euRealmData } = useLoaderData<typeof loader>();

  return <CreateProfile usRealmData={usRealmData} euRealmData={euRealmData} />;
}
