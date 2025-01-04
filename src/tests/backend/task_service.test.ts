import { TaskService } from '../../backend/services/task_service';

describe('TaskService', () => {
  it('should create a task', async () => {
    const task = await TaskService.createTask({ title: 'Test Task' });
    expect(task.title).toBe('Test Task');
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const tasks = await TaskService.getAllTasks();
      expect(tasks).toBeInstanceOf(Array);
    });

    it('should return tasks with correct structure', async () => {
      const tasks = await TaskService.getAllTasks();
      expect(tasks[0]).toHaveProperty('id');
      expect(tasks[0]).toHaveProperty('title');
      expect(tasks[0]).toHaveProperty('description');
      expect(tasks[0]).toHaveProperty('completed');
    });
  });
});
