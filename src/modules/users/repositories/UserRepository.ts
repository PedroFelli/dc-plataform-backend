import IUserDTO from '../models/IUserDTO';
import User from '../models/User';
import IUsersRepository from './IUserRepository';

export class UserRepository implements IUsersRepository {
  public async create(data: IUserDTO): Promise<IUserDTO> {
    const user = new User(data);
    const newUser = await user.save();

    return newUser;
  }

  public async findByEmail(email: string): Promise<IUserDTO | null> {
    const newUser = await User.findOne({ email });

    return newUser;
  }
}

export default UserRepository;
