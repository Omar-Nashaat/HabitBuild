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
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab
} from '@mui/material'
import {
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  EmojiEvents as EmojiEventsIcon,
  CalendarToday as CalendarTodayIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../services/api'
import { jwtDecode } from 'jwt-decode'

function Challenges () {
  const navigate = useNavigate()
  const [challenges, setChallenges] = useState([])
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const userId = decodedToken.id

  useEffect(() => {
    getChallenges()
  }, [])

  const getChallenges = () => {
    axiosInstance
      .get(`/api/challenges/`)
      .then(res => {
        console.log(res.data)
        setChallenges(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const joinChallenge = chId => {
    axiosInstance
      .post(`/api/challenges/${chId}/join`)
      .then(res => {
        console.log(res.data)
        getChallenges()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant='h4'>Challenges</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => navigate('/challenges/new')}
        >
          Create Challenge
        </Button>
      </Box>

      {/* Challenges Grid */}
      <Grid container spacing={3}>
        {challenges.map(challenge => (
          <Grid item xs={12} md={6} lg={4} key={challenge.id}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  {challenge.title}
                </Typography>
                <Typography color='text.secondary' sx={{ mb: 2 }}>
                  {challenge.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarTodayIcon
                    sx={{ fontSize: 'small', mr: 1, color: 'text.secondary' }}
                  />
                  <Typography variant='body2' color='text.secondary'>
                    {challenge.createdAt.split('T')[0]}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <GroupIcon
                    sx={{ fontSize: 'small', mr: 1, color: 'text.secondary' }}
                  />
                  <Typography variant='body2' color='text.secondary'>
                    {challenge.participants.length} participants
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                {challenge.participants.includes(userId) ? (
                  <Button
                    fullWidth
                    variant={
                      challenge.participants.includes(userId)
                        ? 'outlined'
                        : 'contained'
                    }
                    onClick={() => navigate(`/challenges/${challenge._id}`)}
                  >
                    {challenge.participants.includes(userId)
                      ? 'View Progress'
                      : 'Join Challenge'}
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant={
                      challenge.participants.includes(userId)
                        ? 'outlined'
                        : 'contained'
                    }
                    onClick={() => joinChallenge(challenge._id)}
                  >
                    {challenge.participants.includes(userId)
                      ? 'View Progress'
                      : 'Join Challenge'}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Challenges
