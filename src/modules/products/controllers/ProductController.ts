import { Request, Response } from 'express';

import CreateProductsService from '../services/CreateProductsService';


export default class ProductController {
  async create(request: Request, response: Response): Promise<Response> {

    const data = request.body;

    const createProduct = new CreateProductsService();

    try {
      const product = await createProduct.execute(data);

      return response.status(201).json(product);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Internal sever error!',
      });
    }
  }

  // async index(request: Request, response: Response): Promise<Response> {
   

  //   try {
      
  //   } catch (err) {
  //     return response.status(400).json({
  //       message: err.message || 'Internal sever error!',
  //     });
  //   }
  // }

  // async delete(request: Request, response: Response): Promise<Response> {
    

  //   try {
  
  //   } catch (err) {
  //     return response.status(400).json({
  //       message: err.message || 'Internal sever error!',
  //     });
  //   }
  // }

  // async show(request: Request, response: Response): Promise<Response> {
  

  //   try {
      
  //   } catch (err) {
  //     return response.status(400).json({
  //       message: err.message || 'Internal sever error!',
  //     });
  //   }
  // }
}
