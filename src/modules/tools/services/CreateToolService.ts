import IDataDTO from '../models/IToolDTO';
import IToolRepository from '../repositories/IToolRepository';
import AppError from '../../../errors/AppError';

class CreateToolService {
  constructor(private toolRepository: IToolRepository) {}

  async execute(data: IDataDTO): Promise<IDataDTO> {
    const checkExistTool = await this.toolRepository.findByTitle(data.title);

    if (checkExistTool) {
      throw new AppError('Tool already exists');
    }

    const tool = await this.toolRepository.create(data);

    return tool;
  }
}

export default CreateToolService;
