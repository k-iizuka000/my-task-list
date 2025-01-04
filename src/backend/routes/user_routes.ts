import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user_controller';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', UserController.createUser);
  fastify.get('/', UserController.getUsers);
} 