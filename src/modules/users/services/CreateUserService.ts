import AppError from '../../../errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

interface IResponse {
  name: string;
  email: string;
}

class CreateUserservice {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<IResponse> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const userCreated = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = {
      name: userCreated.name,
      email: userCreated.email,
    };

    return user;
  }
}

export default CreateUserservice;
