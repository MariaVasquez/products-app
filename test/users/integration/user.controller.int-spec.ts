import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import request from 'supertest';
import * as dotenv from 'dotenv';
import { Result } from 'src/shared/result/result';
import { UserResponseDto } from '../../../src/users/interfaces/dto/user-response.dto';
import { mockUserRequest } from '../data/data-mock-user';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

describe('UserController (integration)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    try {
      dotenv.config({ path: '.env.test' });

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env.test',
          }),
          AppModule,
        ],
      }).compile();

      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
      await app.init();

      dataSource = moduleFixture.get<DataSource>(getDataSourceToken());
    } catch (err) {
      console.error('[TEST] Error al iniciar:', err);
    }
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dataSource.synchronize(true);
  });

  it('POST /api/users → debe crear un usuario', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/users')
      .send(mockUserRequest)
      .expect(201);

    const body = response.body as Result<UserResponseDto>;

    expect(body.status).toBe(201);
    expect(body.code).toBe('TRAPP_SUCC_6');
    expect(body.data!.email).toBe(mockUserRequest.email);
  });

  it('GET /api/users/:id → debe devolver el usuario buscado', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/users')
      .send(mockUserRequest)
      .expect(201);

    const bodyCreate = response.body as Result<UserResponseDto>;
    const createdUserId = bodyCreate.data!.id;

    const getResponse = await request(app.getHttpServer())
      .get(`/api/users/${createdUserId}`)
      .expect(200);

    const body = getResponse.body as Result<UserResponseDto>;

    expect(body.data!.email).toBe(mockUserRequest.email);
    expect(body.data!.name).toBe(mockUserRequest.name);
  });
});
