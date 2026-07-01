'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchEntries } from '../../utils/contentfulPosts' // Fetch Contentful entries
import ShortPosts from '../../components/ShortPosts' // Post component
import styles from '../../style/articlesPage.module.css'

export interface Image {
  fields: {
    file: {
      url: string
    }
    description?: string
  }
}
export interface Author {
  fields: {
    nom: string
  }
}
export interface ContentfulPost {
  metadata: {
    tags: {
      sys: {
        id: string
      }
    }[]
  }
  dateDePublication?: string
  auteur?: Author
  miniTexteDePrsentation?: string
  imageDeCouverture?: Image
  texte?: string
  titre: string
  sys: {
    id: string
  }
}

export interface Entry {
  fields: {
    imageDeCouverture?: Image
    texte?: string
    titre: string
    dateDePublication?: string
    auteur?: Author
    miniTexteDePrsentation?: string
  }
  metadata: {
    tags: { sys: { id: string } }[]
  }
  sys: {
    id: string
  }
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<ContentfulPost[]>([]) // State for blog posts
  const [loading, setLoading] = useState(true) // Loading state to track fetch status
  const router = useRouter()

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = (await fetchEntries()) as Entry[] | undefined
        if (res) {
          const posts = res.map((entry: Entry) => ({
            ...entry.fields,
            metadata: entry.metadata,
            sys: entry.sys,
          }))

          // Filter out posts with the 'auteurs' tag
          const filteredPosts = posts.filter((post: ContentfulPost) => {
            return !post.metadata?.tags.some(tag => tag.sys.id === 'auteurs')
          })

          setPosts(filteredPosts) // Set filtered posts
        }
      } catch (error) {
        console.error('Error fetching entries:', error)
      } finally {
        setLoading(false) // Stop loading state
      }
    }
    getPosts()
  }, [])

  const handleClick = (id: string) => {
    router.push(`/articles/${id}`)
  }

  if (loading) {
    return <div className={styles.state}>Chargement des articles…</div>
  }

  return (
    <div className={styles.pageShell}>
      <header className={styles.pageHeader}>
        <p className={styles.kicker}>Articles</p>
        <h1>Les publications du club, mises en avant proprement.</h1>
        <p>
          Une lecture plus confortable pour les annonces et les retours sur les
          sujets qui comptent pour Sperkise.
        </p>
      </header>

      {posts.length === 0 && (
        <div className={styles.state}>
          Aucun article disponible pour le moment.
        </div>
      )}

      {posts.map((post, index) => (
        <ShortPosts
          key={post.sys.id}
          title={post.titre}
          image={post?.imageDeCouverture}
          miniText={post.miniTexteDePrsentation}
          author={post.auteur}
          date={post.dateDePublication}
          index={index}
          onClick={() => handleClick(post.sys.id)}
        />
      ))}
    </div>
  )
}

export default Home
