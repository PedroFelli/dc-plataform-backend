import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import UserRepository from '../repositories/UserRepository';
import HashProvider from '../providers/HashProvider/implementations/BCryptHahProvider';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UserRepository();
    const hashProvider = new HashProvider();

    const createUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

    const { email, password } = request.body;

    try {
      const user = await createUser.execute({
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
