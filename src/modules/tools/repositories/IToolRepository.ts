import IDataDTO from '../models/IToolDTO';

export default interface IToolRespository {
  create(data: IDataDTO): Promise<IDataDTO>;
  getAll(): Promise<IDataDTO[] | undefined>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IDataDTO | null>;
  findByTitle(title: string): Promise<IDataDTO | null>;
  findByTag(tag: string): Promise<IDataDTO[] | undefined>;
}
