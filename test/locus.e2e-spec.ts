import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { getUserByRole, UserRoleEnum } from '../src/users';

describe('LocusController (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;
  let normalToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    // Login as admin
    const adminUser = getUserByRole(UserRoleEnum.ADMIN);
    const adminResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: adminUser.username,
        password: adminUser.password,
      });

    adminToken = adminResponse.body.accessToken;

    // Login as normal user
    const normalUser = getUserByRole(UserRoleEnum.NORMAL);
    const normalResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: normalUser.username,
        password: normalUser.password,
      });

    normalToken = normalResponse.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /locus should require auth', async () => {
    await request(app.getHttpServer()).get('/locus').expect(401);
  });

  it('admin should access sideloading', async () => {
    await request(app.getHttpServer())
      .get('/locus?sideloading=locusMembers')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });

  it('normal user should NOT access sideloading', async () => {
    await request(app.getHttpServer())
      .get('/locus?sideloading=locusMembers')
      .set('Authorization', `Bearer ${normalToken}`)
      .expect(403);
  });

  it('should support pagination', async () => {
    const response = await request(app.getHttpServer())
      .get('/locus?limit=5')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body.length).toBeLessThanOrEqual(5);
  });
});
