import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { getUserByRole, UserRoleEnum } from '../src/users';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const user = getUserByRole(UserRoleEnum.ADMIN);

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: user.username,
        password: user.password,
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(typeof response.body.accessToken).toBe('string');
  });

  it('should reject invalid password', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: user.username,
        password: 'wrong-password',
      })
      .expect(401);
  });

  it('should reject invalid username', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'unknown-user',
        password: user.password,
      })
      .expect(401);
  });
});
