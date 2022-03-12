import { MY_RECCOMENDATIONS } from '../queries'
import { useQuery } from '@apollo/client'
import BooksList from './BooksList'

const Reccomended = props => {
  if (!props.show) {
    return null
  }

  const result = useQuery(MY_RECCOMENDATIONS)
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.myRecoomendations

  return (
    <div>
      <h2>Reccomendations</h2>
      <BooksList books={books} />
    </div>
  )
}

export default Reccomended
