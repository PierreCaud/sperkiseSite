import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../style/homePage.module.css' // Custom styles for the homepage

const HomePage = () => {
  return (
    <div className={styles['homepage']}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Wasquehal · Sciences de la Terre</p>
          <h1>
            Le club où les minéraux, les fossiles et les curieux se rencontrent.
          </h1>
          <p className={styles.lead}>
            Sperkise rassemble les passionnés de minéralogie et de paléontologie
            autour de conférences, d&apos;échanges, de sorties terrain et de
            notre bourse annuelle.
          </p>

          <div className={styles.actions}>
            <Link href='/actualites' className={styles.primaryAction}>
              Voir les actualités
            </Link>
            <Link href='/jeu' className={styles.secondaryAction}>
              Jeu de la pierre
            </Link>
            <Link href='/contact' className={styles.secondaryAction}>
              Nous contacter
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.logoFrame}>
            <Image
              src='/images/logo.png'
              alt='Logo Sperkise'
              width={420}
              height={420}
              priority={true}
              className={styles.logo}
            />
          </div>
          <div className={styles.heroNote}>
            <span className={styles.noteLabel}>Prochaine étape</span>
            <strong>
              Retrouver la bourse, les réunions et les articles du club.
            </strong>
            <p>
              Une vitrine simple, claire et vivante pour suivre la vie de
              l&apos;association.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>Pourquoi venir</p>
          <h2>Un club vivant, curieux et concret.</h2>
        </div>

        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h3>Des rendez-vous réguliers</h3>
            <p>
              Réunions mensuelles, conférences et échanges autour des fossiles,
              des minéraux, des météorites et des volcans.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Du terrain, pas seulement des vitrines</h3>
            <p>
              Sorties de collecte, observations sur site et partage de méthodes,
              avec une vraie dimension de découverte.
            </p>
          </article>

          <article className={styles.card}>
            <h3>Une belle mémoire commune</h3>
            <p>
              Plus de 600 ouvrages, des ressources pour apprendre et une bourse
              annuelle qui met le club en lumière.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.highlightBand}>
        <div>
          <p className={styles.kicker}>En ce moment</p>
          <h2>Le site continue d&apos;évoluer, mais la base est déjà là.</h2>
        </div>
        <p>
          Si vous repérez un contenu à corriger ou une idée de mise en page qui
          servirait mieux le club, vous pouvez nous écrire directement.
        </p>
      </section>
    </div>
  )
}

export default HomePage
