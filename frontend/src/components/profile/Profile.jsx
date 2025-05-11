import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material'
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material'
import axiosInstance from '../../services/api'
import {jwtDecode} from 'jwt-decode';

function Profile () {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState()
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    goals: [
      'Exercise 30 minutes daily',
      'Read 20 pages every day',
      'Meditate for 10 minutes'
    ]
  })

  const token = localStorage.getItem('token')
  const decodedToken = token ? jwtDecode(token) : null;

  const handleSaveChanges = () => {
    setIsEditing(false)
    // Save changes to backend
  }

  const getDetails = () => {
    axiosInstance
      .get('/api/users/me/progress')
      .then(res => {
        console.log(res.data)
        setUserData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleMarkAsDone = async habitId => {
    try {
      await axiosInstance.post(`/api/habits/${habitId}/complete`)
      // Re-fetch habits after update
      const res = await axiosInstance.get('/api/habits')
      setHabits(res.data)
    } catch (err) {
      console.error('Error marking habit as done', err)
    }
  }

  useEffect(() => {
    getDetails()
    console.log(decodedToken);
    
  }, [])

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  mx: 'auto'
                }}
              >
                {decodedToken.name.charAt(0)}
              </Avatar> 
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: -10,
                  backgroundColor: 'white'
                }}
                size='small'
              >
                {/* <PhotoCameraIcon /> */}
              </IconButton>
            </Box>
            <Typography variant='h5' gutterBottom>
              {decodedToken.name}
            </Typography>
            <Typography color='text.secondary' gutterBottom>
              {decodedToken.email}
            </Typography>
            {/* <Button
              variant={isEditing ? 'contained' : 'outlined'}
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              onClick={() =>
                isEditing ? handleSaveChanges() : setIsEditing(true)
              }
              sx={{ mt: 2 }}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button> */}
          </Paper>
        </Grid>

        {/* Goals Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Summary
            </Typography>
            {/* <List>
              {profileData.goals.map((goal, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      isEditing && (
                        <IconButton edge='end' aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                  >
                    {isEditing ? (
                      <TextField
                        fullWidth
                        value={goal}
                        onChange={e => {
                          const newGoals = [...profileData.goals]
                          newGoals[index] = e.target.value
                          setProfileData({ ...profileData, goals: newGoals })
                        }}
                      />
                    ) : (
                      <ListItemText primary={goal} />
                    )}
                  </ListItem>
                  {index < profileData.goals.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List> */}
            <ListItem>
              {/* <TextField
                fullWidth
                value={userData?.summary}
              /> */}
              <ListItemText primary={userData?.summary} />
            </ListItem>
            {isEditing && (
              <Button
                variant='outlined'
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                  setProfileData({
                    ...profileData,
                    goals: [...profileData.goals, '']
                  })
                }}
              >
                Add New Goal
              </Button>
            )}
          </Paper>

          {/* Statistics Section */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant='h6' gutterBottom>
              Your Statistics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box textAlign='center'>
                  <Typography variant='h4' color='primary'>
                    {userData?.activeStreaks}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Active Streaks
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box textAlign='center'>
                  <Typography variant='h4' color='primary'>
                    {userData?.totalCompletions}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                   Total Completions
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile
