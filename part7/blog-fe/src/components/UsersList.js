import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const getUsers = state => state.users

  const users = useSelector(getUsers)

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
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
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
