import { BlizzAPI } from 'blizzapi';

export async function GET() {
  const api = new BlizzAPI({
    region: 'us',
    clientId: process.env.BATTLE_NET_CLIENT_ID,
    clientSecret: process.env.BATTLE_NET_CLIENT_SECRET,
  });

  const data = await api.query(
    '/data/wow/realm/index?region=us&namespace=dynamic-us'
  );

  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     next: { revalidate: 60 }, // Revalidate every 60 seconds
  //   });

  //   const data = await res.json();

  console.log(data);

  return Response.json({});
}
