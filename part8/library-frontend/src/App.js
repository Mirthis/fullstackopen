import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Reccomended from './components/Reccomended'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'
import { updateCache } from './utils'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const tkn = localStorage.getItem('library-user-token')
    if (tkn) setToken(tkn)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null
    }
    return <div style={{ color: 'red' }}>{errorMessage}</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('reccomended')}>reccomended</button>
        )}
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <button onClick={() => logout()}>logout</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />

      <Reccomended show={page === 'reccomended'} />

      <LoginForm
        setToken={setToken}
        setError={notify}
        setPage={setPage}
        show={page === 'login'}
      />
    </div>
  )
}

export default App
