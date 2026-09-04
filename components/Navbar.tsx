'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from '../style/navbar.module.css' // Import the CSS module

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href='/' className={styles.brand} aria-label='Aller à l’accueil'>
          <Image
            src='/images/logo.png'
            alt='Logo Sperkise'
            width={54}
            height={54}
            priority={true}
            className={styles.logo}
          />
          <span className={styles.brandCopy}>
            <strong>Sperkise</strong>
            <span>Minéralogie et paléontologie</span>
          </span>
        </Link>

        <button
          type='button'
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls='primary-navigation'
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setIsMenuOpen(open => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul
          id='primary-navigation'
          className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}
        >
          <li className={styles.navItem}>
            <Link
              href='/'
              className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
              aria-current={pathname === '/' ? 'page' : undefined}
              onClick={closeMenu}
            >
              Accueil
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href='/articles'
              className={`${styles.navLink} ${pathname.startsWith('/articles') ? styles.active : ''}`}
              aria-current={
                pathname.startsWith('/articles') ? 'page' : undefined
              }
              onClick={closeMenu}
            >
              Articles
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href='/actualites'
              className={`${styles.navLink} ${pathname === '/actualites' ? styles.active : ''}`}
              aria-current={pathname === '/actualites' ? 'page' : undefined}
              onClick={closeMenu}
            >
              Actualités
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href='/jeu'
              className={`${styles.navLink} ${pathname === '/jeu' ? styles.active : ''}`}
              aria-current={pathname === '/jeu' ? 'page' : undefined}
              onClick={closeMenu}
            >
              Jeu
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href='/contact'
              className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}
              aria-current={pathname === '/contact' ? 'page' : undefined}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
