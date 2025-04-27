import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from API
  const fetchTasks = async () => {
    const res = await axiosInstance.get('/tasks');
    setTasks(res.data);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle drag-and-drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const taskId = draggableId;
    const newStatus = destination.droppableId;

    try {
      await axiosInstance.put(`/tasks/${taskId}/status`, { status: newStatus });
      fetchTasks();  // Re-fetch tasks after status update
    } catch (err) {
      console.error(err);
    }
  };

  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>Task Manager</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          {statuses.map((status) => (
            <Box key={status} flex={1}>
              <Typography variant="h5" align="center">{status}</Typography>
              <Droppable droppableId={status}>
                {(provided) => (
                  <Paper
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ minHeight: '400px', padding: '10px', backgroundColor: '#f4f4f4' }}
                  >
                    {tasks
                      .filter(task => task.status === status)
                      .map((task, index) => (
                        <Draggable draggableId={task._id} index={index} key={task._id}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Container>
  );
};

export default Dashboard;
