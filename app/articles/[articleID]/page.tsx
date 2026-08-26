'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import fetchById from '../../../utils/fetchById'
import type { ContentfulPost } from '../page'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import styles from '../../../style/article.module.css'

const Article: React.FC = () => {
  const [post, setPost] = useState<ContentfulPost | null>(null)
  const [loading, setLoading] = useState(true)
  const { articleID } = useParams()

  useEffect(() => {
    if (articleID) {
      const getPost = async () => {
        try {
          const fetchedPost = await fetchById(articleID as string)
          setPost(fetchedPost)
        } catch (error) {
          console.error('Error fetching post:', error)
        } finally {
          setLoading(false)
        }
      }
      getPost()
    }
  }, [articleID])

  if (loading) {
    return <div className={styles.state}>Chargement de l’article…</div>
  }

  if (!post) {
    return <div className={styles.state}>Article introuvable.</div>
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.post}>
        <p className={styles.kicker}>Article</p>
        <h1>{post.titre}</h1>
        {post.dateDePublication && (
          <h3>
            {new Date(post.dateDePublication).toLocaleDateString('fr-FR')}
          </h3>
        )}
        {post.imageDeCouverture && (
          <figure className={styles.mediaFrame}>
            <Image
              alt={
                post.imageDeCouverture.fields?.description ||
                'Image de couverture de l’article'
              }
              src={`https:${post.imageDeCouverture.fields?.file?.url}`}
              fill={true}
              sizes='(max-width: 768px) 92vw, 720px'
              priority={true}
              loading='eager'
              className={styles.postImage}
            />
          </figure>
        )}
        <div className={styles.textContent}>
          <ReactMarkdown>{post.texte}</ReactMarkdown>
        </div>
        {post.auteur && (
          <p className={styles.author}>Par {post.auteur.fields?.nom}</p>
        )}
      </div>
    </div>
  )
}

export default Article
