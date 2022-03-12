import { ALL_BOOKS, GET_LOGGED_USER } from '../queries'
import { useQuery } from '@apollo/client'
import BooksList from './BooksList'

const Reccomended = props => {
  if (!props.show) {
    return null
  }

  const userResult = useQuery(GET_LOGGED_USER)
  const bookResult = useQuery(ALL_BOOKS)
  if (userResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }
  const allBooks = bookResult.data.allBooks
  const books = allBooks.filter(b =>
    b.genres.includes(userResult.data.me.favoriteGenre)
  )

  return (
    <div>
      <h2>Reccomendations</h2>
      <BooksList books={books} />
    </div>
  )
}

export default Reccomended
