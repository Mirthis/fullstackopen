import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const BornForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn, result] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      setError(error.graphQLErrors[0].message)
    },
  })

  const submit = event => {
    event.preventDefault()

    changeBorn({ variables: { name, born: +born } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editBorn === null) {
      setError('person not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>change born year</h2>

      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">change born year</button>
      </form>
    </div>
  )
}

export default BornForm
