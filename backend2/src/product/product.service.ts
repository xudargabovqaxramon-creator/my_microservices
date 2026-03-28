import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const foundProduct = await this.productRepository.findOne({ where: { id } });
    if (!foundProduct) {
      throw new NotFoundException("Product not found")
    }
    return foundProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const foundProduct = await this.findOne(id);
    if (!foundProduct) throw new NotFoundException("Product not found")
    return await this.productRepository.update(id, { ...updateProductDto, id: foundProduct.id });
  }

  async remove(id: number) {
    const foundProduct = await this.findOne(id);
    if (!foundProduct) {
      throw new NotFoundException("Product not found")
    }
    return await this.productRepository.delete(id);
  }
}
