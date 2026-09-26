'use client'

import Link from 'next/link'
import styles from '../../../style/jeu.module.css'

const MerciPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div
        className={styles.card}
        style={{ maxWidth: '48rem', margin: '0 auto' }}
      >
        <p className={styles.kicker}>Merci !</p>
        <h1 style={{ marginTop: '1rem' }}>
          Votre participation a bien été enregistrée.
        </h1>
        <p className={styles.note}>
          Merci d&apos;avoir participé au jeu de la pierre. Le gagnant sera
          annoncé à la fin de la journée, puis nous vous recontacterons si vous
          avez validé la case de relance pour les prochaines bourses.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginTop: '1.5rem',
          }}
        >
          <Link
            href='/jeu'
            className={styles.submitButton}
            style={{ textDecoration: 'none' }}
          >
            Retour au jeu
          </Link>
          <Link
            href='/'
            className={styles.submitButton}
            style={{
              textDecoration: 'none',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MerciPage
