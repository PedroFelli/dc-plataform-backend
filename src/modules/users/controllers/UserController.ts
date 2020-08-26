import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/UserRepository';
import HashProvider from '../providers/HashProvider/implementations/BCryptHahProvider';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UserRepository();
    const hashProvider = new HashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const { name, email, password } = request.body;

    try {
      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Internal sever error!',
      });
    }
  }
}
