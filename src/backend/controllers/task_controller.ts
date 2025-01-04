import { TaskService } from '../services/task_service';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TaskController {
  static async createTask(req: FastifyRequest, reply: FastifyReply) {
    try {
      const schema = {
        body: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            title: { type: 'string', minLength: 1, maxLength: 100 },
            description: { type: 'string', minLength: 1, maxLength: 500 },
            completed: { type: 'boolean', default: false }
          }
        }
      };

      req.validate(schema);
      
      const task = await TaskService.createTask(req.body);
      reply.code(201).send({
        status: 'success',
        data: task
      });
    } catch (error) {
      reply.code(error.statusCode || 500).send({
        status: 'error',
        message: error.message || 'Internal Server Error'
      });
    }
  }

  static async getTasks(req: FastifyRequest, reply: FastifyReply) {
    try {
      const tasks = await TaskService.getAllTasks();
      reply.send({
        status: 'success',
        data: tasks
      });
    } catch (error) {
      reply.code(error.statusCode || 500).send({
        status: 'error',
        message: error.message || 'Internal Server Error'
      });
    }
  }

  static async updateTask(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const task = await TaskService.updateTask(id, req.body);
    reply.send(task);
  }

  static async deleteTask(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    await TaskService.deleteTask(id);
    reply.send({ message: 'Task deleted successfully' });
  }
}
