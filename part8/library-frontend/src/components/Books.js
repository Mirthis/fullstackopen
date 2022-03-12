import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
