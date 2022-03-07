import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'

const UsersList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const getUsers = state => state.users

  const users = useSelector(getUsers)
  console.log(users)

  return (
    <div>
      <h2>Users</h2>
      {!users || users.length === 0 ? (
        <p>No user Found</p>
      ) : (
        <table>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UsersList
