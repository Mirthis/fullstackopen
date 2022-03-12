import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import BooksList from './BooksList'

const Books = props => {
  if (!props.show) {
    return null
  }

  const [genreFilter, setGenreFilter] = useState(null)
  const result = useQuery(ALL_BOOKS)
  if (result.loading) {
    return <div>loading...</div>
  }
  const allBooks = result.data.allBooks
  const books = genreFilter
    ? allBooks.filter(b => b.genres.includes(genreFilter))
    : allBooks
  const genres = Object.values(allBooks).flatMap(book => book.genres)
  const genresSet = new Set(genres)

  return (
    <div>
      <h2>books</h2>
      <BooksList books={books} />
      <div>
        {[...genresSet].map(g => (
          <button key={g} onClick={() => setGenreFilter(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
