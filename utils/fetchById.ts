import { fetchEntryById } from './contentfulPosts' // Fetch Contentful entries
import type { ContentfulPost } from '../app/articles/page'

const fetchById = async (id: string) => {
  try {
    const entry = await fetchEntryById(id)
    const typedEntry = entry as unknown as {
      fields: Omit<ContentfulPost, 'metadata' | 'sys'>
      metadata: ContentfulPost['metadata']
      sys: ContentfulPost['sys']
    }

    const post = {
      ...typedEntry.fields,
      metadata: typedEntry.metadata,
      sys: typedEntry.sys,
    }

    if (post?.metadata?.tags?.some(tag => tag.sys.id === 'auteurs')) {
      return null
    }

    return post
  } catch (error) {
    console.error('Error fetching entries:', error)
  }
  return null
}

export default fetchById
