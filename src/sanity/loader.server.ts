import { loadQuery, setServerClient } from './loader'
import { apiReadToken, client } from './client'

const serverClient = client.withConfig({ token: apiReadToken })
setServerClient(serverClient)

export { loadQuery }