import { createClient, type ClientConfig } from '@sanity/client'

const config: ClientConfig = {
  projectId: 'ubo8m1s0',
  dataset: 'dumppi-sides',
  useCdn: false,
  apiVersion: '2024-10-07'
}

const client = createClient(config)

export default client
