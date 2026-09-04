'use client'
import React from 'react'
import styles from '../../style/actualites.module.css'
import Image from 'next/image'
import { getNextFirstFriday } from '../../utils/dowloadICSFile'
import {
  buildAndroidCalendarIntent,
  buildGoogleCalendarUrl,
} from '../../utils/calendarLinks'

const formatLongDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const Actualites = () => {
  const nextMeeting = getNextFirstFriday()
  const bourseEvent = {
    title: 'Bourse aux Minéraux et Fossiles Wasquehal',
    description:
      'Bourse aux minéraux et fossiles à Wasquehal. Dates prévisionnelles, confirmation par mail du président avant venue.',
    location: 'Salle Pierre Herman, 5 Rue Jean Macé, 59290 Wasquehal',
    startDate: new Date(2026, 8, 26, 9, 30),
    endDate: new Date(2026, 8, 27, 18, 0),
  }

  const meetingEvent = {
    title: 'Réunion mensuelle du Club de Minéralogie et Paléontologie',
    description:
      'Réunion mensuelle du club. Dates prévisionnelles, confirmation par mail du président avant venue si vous n’êtes pas déjà dans la mailing list.',
    location: '11 Av. du Molinel, 59290 Wasquehal',
    startDate: new Date(
      nextMeeting.getFullYear(),
      nextMeeting.getMonth(),
      nextMeeting.getDate(),
      19,
      45,
    ),
    endDate: new Date(
      nextMeeting.getFullYear(),
      nextMeeting.getMonth(),
      nextMeeting.getDate(),
      21,
      30,
    ),
  }

  const isAndroid =
    typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)

  const bourseCalendarHref = isAndroid
    ? buildAndroidCalendarIntent(bourseEvent)
    : buildGoogleCalendarUrl(bourseEvent)

  const meetingCalendarHref = isAndroid
    ? buildAndroidCalendarIntent(meetingEvent)
    : buildGoogleCalendarUrl(meetingEvent)

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <p className={styles.kicker}>Actualités</p>
        <h1>Les dates, les rencontres et les infos pratiques du club.</h1>
        <p>
          Une page pensée comme un tableau de bord simple: les prochains
          rendez-vous, l&apos;adresse du club et les infos utiles pour venir
          facilement.
        </p>
      </header>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div>
              <p className={styles.badge}>Bourse annuelle</p>
              <h2>Bourse aux Minéraux et Fossiles - 26-27/09/2026</h2>
            </div>
            <Image
              src='/images/bourse_2026.jpg'
              alt='Affiche de la bourse Sperkise'
              width={320}
              height={420}
              className={styles.poster}
            />
          </div>
          <div className={styles.buttonRow}>
            <a
              href={bourseCalendarHref}
              className={styles.calendarButton}
              target='_blank'
              rel='noreferrer'
            >
              Ajouter la bourse au calendrier
            </a>
          </div>
          <p>
            Le week-end du 26-27 septembre 2026, notre club organise la
            traditionnelle bourse aux minéraux et fossiles. Nous vous
            accueillerons de 9h30 à 18h sans interruption. Une restauration sera
            proposée sur place, avec tartes, sandwichs, croque-monsieur et
            boissons.
          </p>

          <div className={styles.location}>
            <p>
              Adresse: Salle Pierre Herman, 5 Rue Jean Macé, 59290 Wasquehal
            </p>
            <p>
              À moins de 5 min du métro Wasquehal Hôtel de Ville. Bus arrêt
              Centre, lignes 30, 906 et C11.
            </p>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2528.703010826013!2d3.1280025999999994!3d50.66977449999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c329a297d026ab%3A0xdee894237310b5d8!2sSalle%20Pierre%20Herman!5e0!3m2!1sfr!2sfr!4v1726964923692!5m2!1sfr!2sfr'
              className={styles.map}
              allowFullScreen
              loading='lazy'
            ></iframe>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.badge}>Réunion mensuelle</p>
          <h2>Prochaine réunion</h2>
          <p>
            La prochaine réunion du club aura lieu le{' '}
            {formatLongDate(nextMeeting)} à 19h45.
            <br />
          </p>
          <div className={styles.notice}>
            <strong>Attention</strong>
            <p>
              Les dates sont prévisionnelles et peuvent changer. La confirmation
              est faite par mail par le président. Si vous ne faites pas déjà
              partie de la mailing list, envoyez un mail avant de venir pour
              être sûr.
            </p>
          </div>
          <div className={styles.buttonRow}>
            <a
              href={meetingCalendarHref}
              className={styles.calendarButton}
              target='_blank'
              rel='noreferrer'
            >
              Ajouter la réunion au calendrier
            </a>
          </div>

          <div className={styles.location}>
            <p>
              Adresse: 11 Av. du Molinel, 59290 Wasquehal, à droite du bâtiment
              de foot.
            </p>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.5374193453224!2d3.133490116005034!3d50.67880667950652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c32ab28820f073%3A0x86b7fb9b86cb0562!2s11%20Avenue%20du%20Molinel%2C%2059290%20Wasquehal!5e0!3m2!1sen!2sfr!4v1695327289516!5m2!1sen!2sfr'
              className={styles.map}
              allowFullScreen
              loading='lazy'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Actualites
