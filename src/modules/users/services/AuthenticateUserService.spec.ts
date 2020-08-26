import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '../../../errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserservice from './CreateUserService';

describe('Auth user', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const hashProvider = new FakeHashProvider();

    const createUser = new CreateUserservice(fakeUserRepository, hashProvider);

    const authenticateService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Pedro',
      email: 'pedro@email.com',
      password: 'passwordw123',
    });

    const response = await authenticateService.execute({
      email: 'pedro@email.com',
      password: 'passwordw123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserservice(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Pedro',
      email: 'pedro@email.com',
      password: 'passwordw123',
    });

    await expect(
      authenticateService.execute({
        email: 'pedro@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
