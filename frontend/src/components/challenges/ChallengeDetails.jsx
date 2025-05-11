import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  ExitToApp as ExitToAppIcon,
  CheckCircle as CheckCircleIcon,
  EmojiEvents as EmojiEventsIcon,
  Flag as FlagIcon,
  Group as GroupIcon
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../services/api'
import { jwtDecode } from 'jwt-decode'

function ChallengeDetails () {
  const navigate = useNavigate()
  const { id } = useParams()
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false)
  const [data, setData] = useState(false)
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const userId = decodedToken.id

  const handleLeaveChallenge = async () => {
    try {
      await axiosInstance.post(`/api/challenges/${id}/leave`)
      setLeaveDialogOpen(false)
      navigate('/challenges')
    } catch (err) {
      console.error('Failed to leave challenge:', err)
    }
  }

  const handleCompleteMilestone = async index => {
    try {
      await axiosInstance.post(`/api/challenges/${id}/complete`, {
        challengeId: id,
        milestoneIndex: index
      })
      getChallengeDetails() // Refresh data
    } catch (err) {
      console.error('Error completing milestone', err)
    }
  }

  const getChallengeDetails = () => {
    axiosInstance(`/api/challenges/${userId}/${id}`)
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getChallengeDetails()
  }, [])

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h4'>{data?.title}</Typography>
        </Box>
        <Typography color='text.secondary' sx={{ mb: 2 }}>
          {data?.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={() => console.log('Share challenge')}
          >
            Share Progress
          </Button> */}
          <Button
            variant='outlined'
            color='error'
            startIcon={<ExitToAppIcon />}
            onClick={() => setLeaveDialogOpen(true)}
          >
            Leave Challenge
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Progress Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant='h6' gutterBottom>
              Your Progress
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant='body2' color='text.secondary'>
                  Overall Progress
                </Typography>
                <Typography variant='body2' color='primary'>
                  {data.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant='determinate'
                value={data.progress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
              Milestones
            </Typography>
            <List>
              {data?.milestones?.map((milestone, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: milestone.achieved
                            ? 'success.main'
                            : 'grey.300'
                        }}
                      >
                        {milestone.achieved ? (
                          <CheckCircleIcon />
                        ) : (
                          <FlagIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={milestone.title} />
                    {!milestone.achieved && (
                      <Button
                        variant={
                          milestone.completedBy.includes(userId)
                            ? 'contained'
                            : 'outlined'
                        }
                        size='small'
                        onClick={() => handleCompleteMilestone(index)}
                        startIcon={<CheckCircleIcon />}
                        sx={{ ml: 2 }}
                      >
                        {milestone.completedBy.includes(userId)
                          ? 'Completed'
                          : 'Complete'}
                      </Button>
                    )}
                  </ListItem>

                  {index < data.milestones?.length - 1 && (
                    <Divider variant='inset' component='li' />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Challenge Info Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Challenge Details
              </Typography>
              <Box sx={{ mt: 2 }}>
                {/* <Typography variant="subtitle2" color="text.secondary">
                  Date
                </Typography> */}
                {/* <Typography gutterBottom>
                  {data.createdAt.split(T)[0]}
                </Typography> */}

                <Typography variant='subtitle2' color='text.secondary'>
                  Participants
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <GroupIcon sx={{ mr: 1, fontSize: 20 }} />
                  {data.participants?.length} people joined
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Leave Challenge Dialog */}
      <Dialog open={leaveDialogOpen} onClose={() => setLeaveDialogOpen(false)}>
        <DialogTitle>Leave Challenge</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to leave this challenge? Your progress will be
            saved, but you won't be able to participate further.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLeaveDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleLeaveChallenge}
            color='error'
            variant='contained'
          >
            Leave Challenge
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default ChallengeDetails
