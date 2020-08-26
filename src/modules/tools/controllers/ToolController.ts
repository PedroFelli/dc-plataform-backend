import { Request, Response } from 'express';

import CreateToolService from '../services/CreateToolService';
import FindAllToolService from '../services/FindAllToolService';
import FindByTagToolService from '../services/FindByTagToolService';
import DeleteToolService from '../services/DeleteToolService';
import ToolRepository from '../repositories/ToolRepository';

export default class ToolController {
  async create(request: Request, response: Response): Promise<Response> {
    const toolRepository = new ToolRepository();

    const data = request.body;

    const createTool = new CreateToolService(toolRepository);

    try {
      const tool = await createTool.execute(data);

      return response.status(201).json(tool);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Internal sever error!',
      });
    }
  }

  async index(request: Request, response: Response): Promise<Response> {
    const toolRepository = new ToolRepository();

    const findTool = new FindAllToolService(toolRepository);

    try {
      const tools = await findTool.execute();

      return response.status(200).json(tools);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Internal sever error!',
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const toolRepository = new ToolRepository();

    const { id } = request.params;

    const deleteTool = new DeleteToolService(toolRepository);

    try {
      await deleteTool.execute(id);

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Internal sever error!',
      });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    const toolRepository = new ToolRepository();
    const { tag } = request.params;

    const findTool = new FindByTagToolService(toolRepository);

    try {
      const tools = await findTool.execute(tag);

      return response.status(200).json(tools);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Internal sever error!',
      });
    }
  }
}
