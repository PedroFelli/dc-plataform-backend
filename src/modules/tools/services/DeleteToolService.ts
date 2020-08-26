import IToolRespository from '../repositories/IToolRepository';
import AppError from '../../../errors/AppError';

class FindToolService {
  constructor(private toolRepository: IToolRespository) {}

  async execute(id: string): Promise<void> {
    const findTool = await this.toolRepository.findById(id);

    if (!findTool) {
      throw new AppError('Tool not find');
    }

    await this.toolRepository.delete(id);
  }
}

export default FindToolService;
