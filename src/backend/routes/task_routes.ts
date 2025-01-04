import { FastifyInstance } from 'fastify';
import { TaskController } from '../controllers/task_controller';

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.post('/', TaskController.createTask);
  fastify.get('/', TaskController.getTasks);
} 