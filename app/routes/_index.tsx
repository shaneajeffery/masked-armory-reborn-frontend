import type { MetaFunction } from '@remix-run/node';
import CreateProfile from '~/components/create-profile';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return <CreateProfile />;
}
