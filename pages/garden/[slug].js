import { useRouter } from 'next/router'
import { getAllNotes, getNoteBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Note({ note, moreNotes, preview }) {
 const router = useRouter()
  if (!router.isFallback && !note?.slug) {
    return <div>Upps</div>
  }

  return (
    <>
      <h2>{note.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const note = getNoteBySlug(params.slug, [
    'title',
    'plantedAt',
    'lastTendedAt',
    'slug',
    'author',
    'content',
    'coverImage',
  ])
  const content = await markdownToHtml(note.content || '')

  return {
    props: {
      note: {
        ...note,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const notes = getAllNotes(['slug'])

  return {
    paths: notes.map((note) => {
      return {
        params: {
          slug: note.slug,
        },
      }
    }),
    fallback: false,
  }
}