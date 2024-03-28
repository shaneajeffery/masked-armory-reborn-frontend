import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import CreateProfile from '~/components/create-profile';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader() {
  // const usRealmData = await db
  //   .select({ label: usRealms.name, value: usRealms.slug })
  //   .from(usRealms)
  //   .orderBy(usRealms.name);
  // const euRealmData = await db
  //   .select({ label: euRealms.name, value: euRealms.slug })
  //   .from(euRealms)
  //   .orderBy(euRealms.name);

  const res = await fetch('http://localhost:8080/v1/realms');

  const realmData = await res.json();

  console.log(realmData);

  return json({
    usRealmData: realmData.usRealms,
    euRealmData: realmData.euRealms,
  });
}

export default function Index() {
  const { usRealmData, euRealmData } = useLoaderData<typeof loader>();

  return <CreateProfile usRealmData={usRealmData} euRealmData={euRealmData} />;
}
