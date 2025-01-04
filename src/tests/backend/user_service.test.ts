import { UserService } from '../../backend/services/user_service';

describe('UserService', () => {
  it('should create a user', async () => {
    const user = await UserService.createUser({ email: 'test@example.com', name: 'Test' });
    expect(user.email).toBe('test@example.com');
  });
}); 