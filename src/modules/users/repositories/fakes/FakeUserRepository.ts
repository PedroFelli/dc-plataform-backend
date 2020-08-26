import { v4 as uuidv4 } from 'uuid';
import User from '../../models/User';
import IUserDTO from '../../models/IUserDTO';
import UsersRepository from '../IUserRepository';

class FakeUsersRepository implements UsersRepository {
  private users: IUserDTO[] = [];

  public async create(data: IUserDTO): Promise<IUserDTO> {
    const user = new User();

    await Object.assign(user, { id: uuidv4() }, data);

    await this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<IUserDTO | null> {
    const fidnUser = this.users.find(user => user.email === email);

    if (fidnUser === undefined) {
      return null;
    }

    return fidnUser;
  }
}

export default FakeUsersRepository;
