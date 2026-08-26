import React from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import type { Image as ContentfulImage, Author } from '../app/articles/page'
import styles from '../style/miniArticles.module.css'

interface PostSummaryProps {
  title: string
  miniText?: string // A brief summary of the post
  image?: ContentfulImage // Optional image
  author?: Author
  date?: string
  index: number // Position index to alternate layout
  onClick: () => void // Function to handle click to navigate to full article
}

const ShortPosts: React.FC<PostSummaryProps> = ({
  title,
  miniText,
  image,
  author,
  date,
  index,
  onClick,
}) => {
  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null
  const authorName = author?.fields?.nom || 'Unknown author'

  // Alternate layout based on the index
  const isImageLeft = index % 2 === 0

  return (
    <article
      className={`${styles['post-summary']} ${isImageLeft ? styles['image-left'] : styles['image-right']}`}
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
    >
      {imageUrl && (
        <Image
          alt={image?.fields?.description || 'No description available'}
          src={imageUrl}
          width={560}
          height={420}
          className={styles['summary-image']}
        />
      )}
      <div className={styles['summary-content']}>
        <h2 className={styles.title}>{title}</h2>
        {date && <h3>{new Date(date).toLocaleDateString()}</h3>}
        <ReactMarkdown className={styles['mini-text']}>
          {miniText || ''}
        </ReactMarkdown>
        {author && <p className={styles.author}>By {authorName}</p>}
      </div>
    </article>
  )
}

export default ShortPosts
