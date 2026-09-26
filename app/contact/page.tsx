'use client'
import React from 'react'
import styles from '../../style/contact.module.css'

const Contact = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <p className={styles.kicker}>Contact</p>
        <h1>Une question, une visite ou un message pour le club.</h1>
        <p>
          Le plus simple est de nous écrire. Vous pouvez aussi passer nous voir
          pendant les événements et à la bourse annuelle.
        </p>
      </header>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h2>Nous contacter</h2>
          <p>
            Pour plus d&apos;informations, n&apos;hésitez pas à nous envoyer un
            mail à l&apos;adresse suivante :
          </p>
          <p className={styles.email}>
            <a href='mailto:michael.laurent59@gmail.com'>
              michael.laurent59@gmail.com
            </a>
          </p>
        </div>

        <div className={styles.card}>
          <p className={styles.badge}>Rendez-vous sur place</p>
          <h2>Venez nous rencontrer à la bourse</h2>
          <p>
            Nous serons disponibles pour répondre à toutes vos questions lors de
            la bourse aux minéraux et fossiles. Venez nous voir à notre stand
            pour en savoir plus sur le club, nos activités, ou simplement
            discuter de minéraux et fossiles.
          </p>

          <div className={styles.location}>
            <p>
              Adresse: Salle Pierre Herman, 5 Rue Jean Macé, 59290 Wasquehal
            </p>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2528.703010826013!2d3.1280025999999994!3d50.66977449999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c329a297d026ab%3A0xdee894237310b5d8!2sSalle%20Pierre%20Herman!5e0!3m2!1sfr!2sfr!4v1726964923692!5m2!1sfr!2sfr'
              className={styles.map}
              allowFullScreen
              loading='lazy'
            ></iframe>
          </div>
        </div>
      </div>

      <div className={styles.socialsContainer}>
        <h2>Suivez-nous</h2>
        <div className={styles.socialsGrid}>
          <a
            href='https://www.facebook.com/share/1FGk9itezM/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.socialLink}
            aria-label='Facebook Sperkise'
          >
            <svg
              className={styles.socialIcon}
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
            </svg>
            <span>Facebook</span>
          </a>
          <a
            href='https://www.instagram.com/sperkise.wasquehal'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.socialLink}
            aria-label='Instagram Sperkise'
          >
            <svg
              className={styles.socialIcon}
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.794.272-1.473.646-2.154 1.327-.682.681-1.046 1.379-1.313 2.154-.266.792-.469 1.663-.529 2.942C.016 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.529 2.941.282.763.646 1.466 1.315 2.147.683.702 1.379 1.077 2.154 1.313.788.257 1.659.459 2.946.522C8.333 23.988 8.74 24 12 24c3.26 0 3.667-.015 4.947-.072 1.281-.06 2.148-.262 2.941-.529.771-.282 1.479-.646 2.147-1.315.695-.682 1.079-1.379 1.313-2.154.24-.793.465-1.658.522-2.946.057-1.28.073-1.687.073-4.947s-.015-3.667-.072-4.947c-.06-1.28-.262-2.149-.529-2.942-.282-.763-.646-1.466-1.315-2.147-.683-.703-1.379-1.077-2.154-1.313-.792-.257-1.663-.459-2.946-.522C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.064 1.17.054 1.805.244 2.227.408.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.355 1.057.408 2.227.055 1.266.064 1.645.064 4.849 0 3.204-.009 3.583-.064 4.849-.054 1.17-.244 1.805-.408 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.355-2.227.408-1.266.055-1.645.064-4.849.064-3.204 0-3.583-.009-4.849-.064-1.17-.054-1.805-.244-2.227-.408-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.355-1.057-.408-2.227-.055-1.266-.064-1.645-.064-4.849 0-3.204.009-3.583.064-4.849.054-1.17.244-1.805.408-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.355 2.227-.408 1.266-.055 1.645-.064 4.849-.064zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z' />
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
