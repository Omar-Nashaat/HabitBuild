import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Divider
} from '@mui/material'
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  EmojiEvents as EmojiEventsIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../services/api'
import { jwtDecode } from 'jwt-decode'

function Dashboard () {
  const navigate = useNavigate()
  const [habits, setHabits] = useState([])
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const decodedToken = token ? jwtDecode(token) : null

  const userName = JSON.parse(localStorage.getItem('auth'))?.username || 'User'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [habitsRes, challengesRes] = await Promise.all([
          axiosInstance.get('/api/habits'),
          axiosInstance.get('/api/challenges')
        ])
        console.log(habitsRes.data)
        console.log(challengesRes.data)
        setHabits(habitsRes.data)
        setChallenges(challengesRes.data)
      } catch (err) {
        console.error('Error loading dashboard data', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    console.log(decodedToken)
  }, [])

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
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Typography variant='h4'>
          Welcome back, {decodedToken?.name}! 👋
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => navigate('/habits/new')}
        >
          Add New Habit
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h5' gutterBottom>
              Your Active Habits
            </Typography>
            <Grid container spacing={2}>
              {loading ? (
                <Typography variant='h6'>...</Typography>
              ) : (
                habits?.map(habit => (
                  <Grid item xs={12} key={habit.id}>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography variant='h6'>{habit.title}</Typography>
                          <Typography
                            color='primary'
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <EmojiEventsIcon sx={{ mr: 1 }} />
                            {habit.streak} day streak
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <LinearProgress
                            variant='determinate'
                            value={habit.streak}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      </CardContent>
                      <CardActions>
                        {habit.progressToday ? (
                          <Button
                            size='small'
                            startIcon={<CheckCircleIcon />}
                            sx={{ color: 'success.main' }}
                          >
                            Habit Done Today
                          </Button>
                        ) : (
                          <Button
                            size='small'
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleMarkAsDone(habit._id)}
                          >
                            Mark as Done
                          </Button>
                        )}
                        <Button
                          size='small'
                          onClick={() => navigate(`/habits/${habit._id}`)}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Active Challenges
            </Typography>
            {challenges.map((challenge, idx) => (
              <React.Fragment key={challenge.id}>
                <Box sx={{ py: 2 }}>
                  <Typography variant='subtitle1'>{challenge.title}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {challenge.participants.length} participants
                  </Typography>
                </Box>
                {idx < challenges.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            <Button
              fullWidth
              variant='outlined'
              sx={{ mt: 2 }}
              onClick={() => navigate('/challenges')}
            >
              View All Challenges
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
