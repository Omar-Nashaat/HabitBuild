import React, { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
  Divider,
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  EmojiEvents as EmojiEventsIcon,
  CalendarToday as CalendarTodayIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { habitService } from '../../services/api'
import axiosInstance from '../../services/api'

function HabitDetails () {
  const navigate = useNavigate()
  const { id } = useParams()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [habit, setHabit] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHabitDetails()
  }, [id])

  const loadHabitDetails = async () => {
    axiosInstance
      .get(`/api/habits/${id}`)
      .then(res => {
        console.log(res.data)
        setHabit(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleDelete = async () => {
    try {
      await habitService.delete(id)
      setDeleteDialogOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Error deleting habit:', error)
    }
  }

  const handleMarkAsDone = async habitId => {
    try {
      await axiosInstance.post(`/api/habits/${habitId}/complete`)
      // Re-fetch habits after update
      const res = await axiosInstance.get('/api/habits')
      location.reload()
    } catch (err) {
      console.error('Error marking habit as done', err)
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (!habit) {
    return <Typography>Habit not found</Typography>
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h4'>{habit.title}</Typography>
        </Box>
        <Box>
          <Button
            variant='outlined'
            startIcon={<EditIcon />}
            onClick={() => navigate(`/habits/${id}/edit`)}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Info Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant='h6' gutterBottom>
              About this Habit
            </Typography>
            <Typography color='text.secondary' paragraph>
              {habit.description}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <EmojiEventsIcon
                    color='primary'
                    sx={{ fontSize: 40, mb: 1 }}
                  />
                  <Typography variant='h5'>{habit.streak}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Day Streak
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <CheckCircleIcon
                    color='primary'
                    sx={{ fontSize: 40, mb: 1 }}
                  />
                  <Typography variant='h5'>{habit.totalCompletions}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Total Completions
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    Progress towards goal
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={habit.streak}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Completion History */}
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Completion History
            </Typography>
            <Box sx={{ mt: 2 }}>
              {habit.completionHistory.map((day, index) => (
                <Box
                  key={day}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    borderBottom:
                      index < habit.completionHistory.length - 1 ? 1 : 0,
                    borderColor: 'divider'
                  }}
                >
                  <CalendarTodayIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography>{day.split('T')[0]}</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <CheckCircleIcon color='success' />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Today's Status
              </Typography>
              {habit.progressToday ? (
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<CheckCircleIcon />}
                  sx={{ mt: 2 }}
                >
                  Completed
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleMarkAsDone(habit._id)}
                  sx={{ mt: 2 }}
                >
                  Mark as Complete
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Habit</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this habit? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default HabitDetails
