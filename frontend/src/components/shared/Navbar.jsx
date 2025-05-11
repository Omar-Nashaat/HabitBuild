import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Navbar () {
  const token = localStorage.getItem('token')
  const nav = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    nav('/login')
  }
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Habit Builder
        </Typography>
        <Box>
          <Button color='inherit' component={RouterLink} to='/'>
            Dashboard
          </Button>
          <Button color='inherit' component={RouterLink} to='/profile'>
            Profile
          </Button>
          {token && (
            <Button
              onClick={logOut}
              color='inherit'
              component={RouterLink}
              to='/'
            >
              Logout
            </Button>
          )}
          {!token && (
            <Button color='inherit' component={RouterLink} to='/login'>
              Login
            </Button>
          )}
          {!token && (
            <Button color='inherit' component={RouterLink} to='/register'>
              Register
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
