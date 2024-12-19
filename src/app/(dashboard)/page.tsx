import { getAuth } from '@/auth';
import { Public } from './public/Public';
import { Private } from './private/Private';

export default async function Dashboard() {
  const auth = await getAuth();

  return auth ? <Private /> : <Public />;
}
