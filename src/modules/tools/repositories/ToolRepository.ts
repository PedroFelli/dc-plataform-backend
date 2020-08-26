import Tool from '../models/Tools';
import ToolDTO from '../models/IToolDTO';
import IToolRepository from './IToolRepository';

class ToolRepository implements IToolRepository {
  public async create(data: ToolDTO): Promise<ToolDTO> {
    const tool = new Tool(data);
    await tool.save();

    return tool;
  }

  public async getAll(): Promise<ToolDTO[] | undefined> {
    const tools = await Tool.find();

    return tools;
  }

  public async delete(id: string): Promise<void> {
    await Tool.findByIdAndDelete(id);
  }

  public async findById(id: string): Promise<ToolDTO | null> {
    const tool = await Tool.findById(id);

    return tool;
  }

  public async findByTitle(title: string): Promise<ToolDTO | null> {
    const tool = await Tool.findOne({ title });

    return tool;
  }

  public async findByTag(tag: string): Promise<ToolDTO[] | undefined> {
    const tools = await Tool.find({ tags: tag });

    if (tools.length === 0) {
      return undefined;
    }

    return tools;
  }
}

export default ToolRepository;
