import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Inject,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiConsumes,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Result } from 'src/shared/result/result';
import { UploadProductImageUseCase } from 'src/products/application/use-cases/interfaces/upload-product-image.use.case.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateProductUseCase } from '../application/use-cases/interfaces/create-product.use-case.interface';
import { GetProductByIdUseCase } from '../application/use-cases/interfaces/get-product-by-id.use-case.interface';
import { GetAllProductsUseCase } from '../application/use-cases/interfaces/get-all-products.use-case.interface';
import { ProductResponseDto } from './dtos/product-response.dto';
import { ProductRequestDto } from './dtos/product-request.dto';
import { ProductImageResponseDto } from './dtos/product-image-response.dto';
import { ProductImageRequestDto } from './dtos/product-image-request.dto';

@ApiTags('Productos')
@Controller('api/products')
export class ProductController {
  constructor(
    @Inject('CreateProductUseCase')
    private readonly createUseCase: CreateProductUseCase,
    @Inject('GetProductByIdUseCase')
    private readonly getByIdUseCase: GetProductByIdUseCase,
    @Inject('GetAllProductsUseCase')
    private readonly getAllUseCase: GetAllProductsUseCase,
    @Inject('UploadProductImageUseCase')
    private readonly uploadImageUseCase: UploadProductImageUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear producto' })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async create(
    @Body() dto: ProductRequestDto,
  ): Promise<Result<ProductResponseDto>> {
    return await this.createUseCase.execute(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar todos los productos' })
  @ApiResponse({ status: 200, type: [ProductResponseDto] })
  async findAll(): Promise<Result<ProductResponseDto[]>> {
    return await this.getAllUseCase.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  async findById(@Param('id') id: number): Promise<Result<ProductResponseDto>> {
    return await this.getByIdUseCase.execute(id);
  }

  @Post(':productId/images')
  @ApiOperation({ summary: 'Upload an image for a product' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'productId', type: Number })
  @ApiBody({
    description: 'Upload a product image',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        isMain: {
          type: 'boolean',
          example: true,
        },
        order: {
          type: 'number',
          example: 1,
        },
      },
      required: ['file', 'isMain', 'order'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('productId', ParseIntPipe) productId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { isMain: string; order: string },
  ): Promise<Result<ProductImageResponseDto>> {
    const imageRequest: ProductImageRequestDto = {
      filename: file.originalname,
      mimeType: file.mimetype,
      content: file.buffer.toString('base64'),
      isMain: body.isMain === 'true',
      order: parseInt(body.order, 10),
      productId,
    };

    return this.uploadImageUseCase.execute(imageRequest);
  }
}
