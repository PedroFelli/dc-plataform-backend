import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AppError from '../../../errors/AppError';

describe('Create UserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, hashProvider);

    const user = await createUser.execute({
      name: 'Pedro',
      email: 'pedro@email.com',
      password: 'passwordw123',
    });

    expect(user).toEqual({
      name: 'Pedro',
      email: 'pedro@email.com',
    });
  });

  it('should not be able to create a new user with same email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserRepository, hashProvider);

    await createUser.execute({
      name: 'Pedro',
      email: 'pedro@email.com',
      password: 'passwordw123',
    });

    await expect(
      createUser.execute({
        name: 'Pedro',
        email: 'pedro@email.com',
        password: 'passwordw123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
