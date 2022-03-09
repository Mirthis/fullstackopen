import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

const UsersList = () => {
  const getUsers = state => state.users

  const users = useSelector(getUsers)

  const columns = [
    { field: 'id', headerName: 'ID', width: 0, hide: true },
    { field: 'name', headerName: 'Name', sortable: true, width: 250 },
    { field: 'blogs', headerName: 'Name', sortable: true, width: 250 },
  ]

  const rows = users.map(user => {
    return {
      id: user.id,
      name: user.name,
      blogs: user.blogs.length,
    }
  })

  return (
    <div>
      <Typography variant="h3" gutterBottom component="div" sx={{ mb: 0 }}>
        Users
      </Typography>
      {!users || users.length === 0 ? (
        <p>No user Found</p>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />

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
        </div>
      )}
    </div>
  )
}

export default UsersList
