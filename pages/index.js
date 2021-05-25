import Head from 'next/head'
import Image from 'next/image'
import { getAllNotes } from '../lib/api'
import styles from '../styles/Home.module.css'

export default function Home({ allNotes }) {
  console.log(allNotes)
  return (
    <div className={styles.container}>
      Hello World
    </div>
  )
}

export async function getStaticProps() {
  const allNotes = getAllNotes([
    'title',
    'plantedAt',
    'lastTendedAt',
    'slug',
    'author',
    'coverImage',
    'tags'
  ])

  return {
    props: { allNotes },
  }
}