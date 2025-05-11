import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';

// Note: In a real application, you would use a charting library like recharts or chart.js
// This is a simplified version for demonstration
function Analytics() {
  const [timeRange, setTimeRange] = useState('month');
  const [habitFilter, setHabitFilter] = useState('all');

  // Mock data for demonstration
  const analyticsData = {
    totalHabits: 8,
    completedHabits: 145,
    currentStreak: 12,
    longestStreak: 21,
    completionRate: 85,
    habitStats: [
      { name: 'Exercise', completionRate: 90, streak: 15 },
      { name: 'Reading', completionRate: 75, streak: 8 },
      { name: 'Meditation', completionRate: 95, streak: 20 },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Analytics Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => console.log('Export data')}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Habits
              </Typography>
              <Typography variant="h4">{analyticsData.totalHabits}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed Tasks
              </Typography>
              <Typography variant="h4">{analyticsData.completedHabits}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Current Streak
              </Typography>
              <Typography variant="h4">{analyticsData.currentStreak} days</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="h4">{analyticsData.completionRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Analytics */}
      <Grid container spacing={3}>
        {/* Habit Performance */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Habit Performance
            </Typography>
            {analyticsData.habitStats.map((habit, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1">{habit.name}</Typography>
                  <Typography variant="subtitle1" color="primary">
                    {habit.completionRate}%
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Box
                    sx={{
                      width: `${habit.completionRate}%`,
                      height: 8,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Current streak: {habit.streak} days
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Achievement Stats */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Achievements
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2">Longest Streak</Typography>
                  <Typography variant="h6">{analyticsData.longestStreak} days</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2">Most Consistent Habit</Typography>
                  <Typography variant="h6">Meditation</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DateRangeIcon color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="subtitle2">Active Days</Typography>
                  <Typography variant="h6">45 days</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Analytics;