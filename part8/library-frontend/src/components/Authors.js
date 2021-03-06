import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import BornForm from './BornForm'
const Authors = props => {
  if (!props.show) {
    return null
  }

  const result = useQuery(ALL_AUTHORS)
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set birth year</h3>
        <BornForm authors={authors} setError={props.setError} />
      </div>
    </div>
  )
}

export default Authors
