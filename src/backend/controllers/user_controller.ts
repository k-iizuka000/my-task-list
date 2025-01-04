import { UserService } from '../services/user_service';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  static async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const schema = {
        body: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            email: { type: 'string', format: 'email' },
            role: { 
              type: 'string', 
              enum: ['admin', 'user'],
              default: 'user'
            }
          }
        }
      };

      req.validate(schema);
      
      const user = await UserService.createUser(req.body);
      reply.code(201).send({
        status: 'success',
        data: user
      });
    } catch (error) {
      reply.code(error.statusCode || 500).send({
        status: 'error',
        message: error.message || 'Internal Server Error'
      });
    }
  }

  static async getUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await UserService.getAllUsers();
      reply.send({
        status: 'success',
        data: users
      });
    } catch (error) {
      reply.code(error.statusCode || 500).send({
        status: 'error',
        message: error.message || 'Internal Server Error'
      });
    }
  }

  static async updateUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const user = await UserService.updateUser(id, req.body);
    reply.send(user);
  }

  static async deleteUser(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    await UserService.deleteUser(id);
    reply.send({ message: 'User deleted successfully' });
  }
}
