import IToolRespository from '../repositories/IToolRepository';

import IDataDTO from '../models/IToolDTO';
import AppError from '../../../errors/AppError';

class FindByTagToolService {
  constructor(private toolRepository: IToolRespository) {}

  async execute(tag: string): Promise<IDataDTO[] | undefined> {
    const tools = await this.toolRepository.findByTag(tag);

    if (!tools) {
      throw new AppError('tag not found');
    }

    return tools;
  }
}

export default FindByTagToolService;
