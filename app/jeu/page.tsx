'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../style/jeu.module.css'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  guess: '',
  consentGame: false,
  consentNextYear: false,
}

const apiEndpoint = '/api/jeu-pierre'

const JeuPierre = () => {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target

    setForm(current => ({
      ...current,
      [name]:
        type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.consentGame) {
      setErrorMessage(
        'La case de consentement est obligatoire pour participer.',
      )
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    const payload = {
      ...form,
      submittedAt: new Date().toISOString(),
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'La soumission a échoué.')
      }

      if (!process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBAPP_URL) {
        const subject = encodeURIComponent(
          'Participation au jeu de la pierre - Sperkise',
        )
        const body = encodeURIComponent(
          [
            'Participation au jeu de la pierre',
            '',
            `Prénom: ${form.firstName}`,
            `Nom: ${form.lastName}`,
            `Email: ${form.email}`,
            `Téléphone: ${form.phone || 'non renseigné'}`,
            `Estimation du poids: ${form.guess}`,
            `Consentement pour le jeu: ${form.consentGame ? 'Oui' : 'Non'}`,
            `Consentement relance année suivante: ${form.consentNextYear ? 'Oui' : 'Non'}`,
          ].join('\n'),
        )

        window.location.href = `mailto:michael.laurent59@gmail.com?subject=${subject}&body=${body}`
      }

      router.push('/jeu/merci')
    } catch (error) {
      console.error('Erreur soumission jeu:', error)
      setErrorMessage(
        'La soumission a échoué. Vous pouvez réessayer ou nous envoyer un mail directement.',
      )
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Jeu de la bourse</p>
          <h1>Devinez le poids de la pierre.</h1>
          <p className={styles.lead}>
            Une petite compétition conviviale pendant la bourse du club. Le
            gagnant sera annoncé à la fin de la journée, selon la meilleure
            estimation et le premier en date en cas d&apos;égalité.
          </p>
        </div>

        <div className={styles.stonePreview} aria-label='Pierre du jeu'>
          <div className={styles.stoneGlow} />
          <div className={styles.stone}>
            <span className={styles.stoneTag}>Pierre mystère</span>
            <strong>3,5 kg</strong>
          </div>
        </div>
      </section>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h2>Formulaire de participation</h2>
          <p className={styles.note}>
            La case de consentement pour le jeu est obligatoire. La case pour
            les prochaines bourses est optionnelle.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <label>
                <span>Prénom</span>
                <input
                  type='text'
                  name='firstName'
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span>Nom</span>
                <input
                  type='text'
                  name='lastName'
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder='Nom ou pseudo'
                  required
                />
              </label>
            </div>

            <div className={styles.row}>
              <label>
                <span>Email</span>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span>Téléphone (facultatif)</span>
                <input
                  type='tel'
                  name='phone'
                  value={form.phone}
                  onChange={handleChange}
                  placeholder='06 ...'
                />
              </label>
            </div>

            <label>
              <span>Votre estimation du poids (kg)</span>
              <input
                type='number'
                step='0.001'
                min='0'
                inputMode='decimal'
                name='guess'
                value={form.guess}
                onChange={handleChange}
                placeholder='Ex. 3,4'
                required
              />
            </label>

            <label className={styles.checkboxRow}>
              <input
                type='checkbox'
                name='consentGame'
                checked={form.consentGame}
                onChange={handleChange}
                required
              />
              <span>
                J&apos;accepte que Sperkise utilise mon adresse e-mail pour me
                contacter au sujet du résultat du jeu, des informations de la
                bourse et du club.
              </span>
            </label>

            <label className={styles.checkboxRow}>
              <input
                type='checkbox'
                name='consentNextYear'
                checked={form.consentNextYear}
                onChange={handleChange}
              />
              <span>
                J&apos;accepte d&apos;être recontacté l&apos;année prochaine
                pour les infos et les prochaines bourses du club. (facultatif)
              </span>
            </label>

            <div className={styles.legalNotice}>
              Les données sont collectées uniquement pour le résultat du jeu,
              les informations du club et les relances autorisées. Un bouton de
              désinscription sera présent dans tout message envoyé.
            </div>

            <button
              type='submit'
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma participation'}
            </button>

            {errorMessage ? (
              <p className={styles.errorMessage}>{errorMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  )
}

export default JeuPierre
