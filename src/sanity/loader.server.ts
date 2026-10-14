import { apiReadToken, client } from './client';
import { loadQuery, setServerClient } from './loader';

const isDev = import.meta.env.DEV;
const usePreviewDrafts = Boolean(isDev && apiReadToken);

const serverClient = client.withConfig({
	token: apiReadToken,
	perspective: usePreviewDrafts ? 'drafts' : 'published',
	useCdn: !usePreviewDrafts,
});
setServerClient(serverClient);

export { loadQuery };
