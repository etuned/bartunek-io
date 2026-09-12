import { apiReadToken, client } from './client';
import { loadQuery, setServerClient } from './loader';

const serverClient = client.withConfig({ token: apiReadToken });
setServerClient(serverClient);

export { loadQuery };
