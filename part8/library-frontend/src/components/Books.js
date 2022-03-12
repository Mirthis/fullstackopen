import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import BooksList from './BooksList'

const Books = props => {
  if (!props.show) {
    return null
  }

  const [genreFilter, setGenreFilter] = useState(null)

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genreFilter },
  })

  const genresResult = useQuery(ALL_GENRES)

  if (booksResult.loading || genresResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks
  const genres = genresResult.data.allGenres

  return (
    <div>
      <h2>books</h2>
      <BooksList books={books} />
      <div>
        {genres.map(g => (
          <button key={g} onClick={() => setGenreFilter(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
