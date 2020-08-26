import IToolRespository from '../repositories/IToolRepository';

import IDataDTO from '../models/IToolDTO';

class FindAllToolService {
  constructor(private toolRepository: IToolRespository) {}

  async execute(): Promise<IDataDTO[] | undefined> {
    const tools = await this.toolRepository.getAll();

    return tools;
  }
}

export default FindAllToolService;
