import React, { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  Chip
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Flag as FlagIcon,
  Add as AddIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import axiosInstance from '../../services/api'

function CreateChallenge () {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    milestones: []
  })
  const [newMilestone, setNewMilestone] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!formData.title.trim()) {
      setError('Challenge title is required')
      return
    }

    if (!formData.description.trim()) {
      setError('Challenge description is required')
      return
    }

    axiosInstance
      .post('/api/challenges', formData)
      .then(res => {
        console.log(res.data)
        navigate('/challenges')
      })
      .catch(err => {
        console.error('Error creating challenge', err)
        setError('An error occurred while creating the challenge')
      })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant='h5'>Create New Challenge</Typography>
          </Box>

          {error && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Challenge Name'
                  required
                  value={formData.title}
                  onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Description'
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  helperText='Describe the challenge and its goals'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Challenge Goal'
                  required
                  value={formData.goal}
                  onChange={e =>
                    setFormData({ ...formData, goal: Number(e.target.value) })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1' sx={{ mb: 1 }}>
                  Milestones
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label='New Milestone'
                    value={newMilestone}
                    onChange={e => setNewMilestone(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (newMilestone.trim()) {
                        setFormData({
                          ...formData,
                          milestones: [
                            ...formData.milestones,
                            { title: newMilestone }
                          ]
                        })
                        setNewMilestone('')
                      }
                    }}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {formData.milestones.map((m, i) => (
                    <Chip
                      key={i}
                      label={m.title}
                      onDelete={() =>
                        setFormData({
                          ...formData,
                          milestones: formData.milestones.filter(
                            (_, idx) => idx !== i
                          )
                        })
                      }
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box
                  sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
                >
                  <Button
                    variant='outlined'
                    onClick={() => navigate('/challenges')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    startIcon={<FlagIcon />}
                  >
                    Create Challenge
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  )
}

export default CreateChallenge
