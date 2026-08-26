import { createClient } from 'contentful'

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

if (!space || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.',
  )
}
const client = createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchEntries() {
  const entries = await client.getEntries()
  if (entries.items) return entries.items
  console.error('Error getting Entries.')
}

export async function fetchEntryById(id: string) {
  return client.getEntry(id)
}

const contentfulAPI = { fetchEntries }

export default contentfulAPI
