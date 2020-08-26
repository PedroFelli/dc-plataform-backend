import Product from "../entities/Product";
import { getRepository } from "typeorm";


interface Request{
  name: string;
  description: string;
}

class CreateProductsService{
  public async execute({name, description}: Request): Promise<Product>{
    const productRepository = getRepository(Product);
    

    const product =  productRepository.create({
      name, description
    });

    await productRepository.save(product);

    return product;
  }

}

export default  CreateProductsService;