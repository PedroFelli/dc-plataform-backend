import { sign } from 'jsonwebtoken';

import AppError from '../../../errors/AppError';
import authConfig from '../../../config/auth';

import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IUser {
  name: string;
  email: string;
}

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userFind = await this.usersRepository.findByEmail(email);

    if (!userFind) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userFind.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userFind.id,
      expiresIn,
    });

    const user = {
      name: userFind.name,
      email: userFind.email,
    };

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
