import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/users/application/use-cases/interfaces/create-user.use-case.interface';
import { Result } from 'src/shared/result/result';
import { GetUserByIdUseCase } from 'src/users/application/use-cases/interfaces/get-user-by-id.use-case.interface';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { GetUserByEmailUseCase } from '../application/use-cases/interfaces/get-user-by-email.use-case.interface';

@ApiTags('Usuarios')
@Controller('api/users')
export class UserController {
  constructor(
    @Inject('CreateUserUseCase')
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('GetUserByIdUseCase')
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    @Inject('GetUserByEmailUseCase')
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo usuario con direcciones' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Error en los datos de entrada' })
  async createUser(
    @Body() dto: UserRequestDto,
  ): Promise<Result<UserResponseDto>> {
    const result = await this.createUserUseCase.execute(dto);

    return result;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Consultar un usuario por id' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserRequestDto,
  })
  async getUserById(@Param('id') id: number): Promise<Result<UserResponseDto>> {
    return await this.getUserByIdUseCase.execute(id);
  }

  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Consultar un usuario por email' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserRequestDto,
  })
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<Result<UserResponseDto>> {
    return await this.getUserByEmailUseCase.execute(email);
  }
}
