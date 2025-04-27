import { Card, CardContent, Typography } from '@mui/material';

const TaskCard = ({ task }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">Assigned: {task.assignedTo?.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
