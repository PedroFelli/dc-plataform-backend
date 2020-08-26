import IUserDTO from '../models/IUserDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<IUserDTO | null>;
  create(data: IUserDTO): Promise<IUserDTO>;
}
