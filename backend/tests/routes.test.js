import request from 'supertest';
import app from '../server.js';
import generateToken from '../utils/generateToken.js';

//node --experimental-vm-modules node_modules/jest/bin/jest.js --forceExit

const adminToken = generateToken('60a50e55645c2b0808562939');
const adminBearerToken = `Bearer ${adminToken}`;

const notExistingPatientId = '60b637c60491a40721008474';
const notExistingUserId = '60b67c77961710083cb63aba';

let createdPrelevationUser;
let createdLabUser;
let createdAdminUser;
let createdPatient;
let createdPatientForTest;
let createdTest;

//User routes

describe('Post prelevation user', () => {
  it('should create a new prelevation user', async (done) => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', adminBearerToken)
      .send({
        name: 'Pasculescu Alin',
        email: 'alin.pasculescu@example.com',
        phoneNumber: '0749683909',
        isPrelevationWorker: true,
      });
    createdPrelevationUser = res.body._id;
    expect(res.statusCode).toEqual(201);
    done();
  });
});

describe('Post lab user', () => {
  it('should create a new lab user', async (done) => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', adminBearerToken)
      .send({
        name: 'Nincu Paula',
        email: 'paula.nincu@example.com',
        phoneNumber: '0749683909',
        isLabWorker: true,
      });
    createdLabUser = res.body._id;
    expect(res.statusCode).toEqual(201);
    done();
  });
});

describe('Post admin user', () => {
  it('should create a new admin user', async (done) => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', adminBearerToken)
      .send({
        name: 'Tite Raluca',
        email: 'ralutite@example.com',
        phoneNumber: '0749683909',
        isAdmin: true,
      });
    createdAdminUser = res.body._id;
    expect(res.statusCode).toEqual(201);
    done();
  });
});

const prelevationToken = generateToken(createdPrelevationUser);
const prelevationBearerToken = `Bearer ${prelevationToken}`;
const labToken = generateToken(createdLabUser);
const labBearerToken = `Bearer ${labToken}`;

describe('Post user from non admin account', () => {
  it('should throw error not authorized to create user', async (done) => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', labBearerToken)
      .send({
        name: 'Albulescu Dan',
        email: 'albulescu.dan@example.com',
        isPrelevationWorker: true,
      });
    expect(res.statusCode).toEqual(401);
    done();
  });
});

describe('Update prelevation user as admin', () => {
  it('should update prelevation user', async (done) => {
    const res = await request(app)
      .put(`/api/users/${createdPrelevationUser}`)
      .set('Authorization', adminBearerToken)
      .send({
        name: 'Albulescu Șerban',
        email: 'albulescuserban@example.com',
        phoneNumber: '0749683909',
        isPrelevationWorker: true,
        isLabWorker: false,
        isAdmin: false,
      });
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Update prelevation user from non admin account', () => {
  it('should throw error not logged in as admin for update', async (done) => {
    const res = await request(app)
      .put(`/api/users/${notExistingUserId}`)
      .set('Authorization', prelevationBearerToken)
      .send({
        email: 'albulescudan@example.com',
        isLabWorker: true,
        isPrelevationWorker: false,
        isAdmin: true,
      });
    expect(res.statusCode).toEqual(401);
    done();
  });
});

describe('Generate reset password', () => {
  it('should generate password link', async (done) => {
    const res = await request(app).post(`/api/users/forgot-password`).send({
      email: 'albulescuserban@example.com',
    });
    expect(res.statusCode).toEqual(250);
    done();
  });
});

describe('Generate reset password for not existing user', () => {
  it('should generate error not existing user', async (done) => {
    const res = await request(app).post(`/api/users/forgot-password`).send({
      email: 'albulescuserban11@example.com',
    });
    expect(res.statusCode).toEqual(404);
    done();
  });
});

describe('Get existing user', () => {
  it('should return user', async (done) => {
    const res = await request(app)
      .get(`/api/users/${createdPrelevationUser}`)
      .set('Authorization', adminBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Get existing user from non admin account', () => {
  it('should return not authorized as admin to get user', async (done) => {
    const res = await request(app)
      .get(`/api/users/${createdPrelevationUser}`)
      .set('Authorization', prelevationBearerToken);
    expect(res.statusCode).toEqual(401);
    done();
  });
});

describe('Get not existing user', () => {
  it('should return error not existing user', async (done) => {
    const res = await request(app)
      .get(`/api/users/${notExistingUserId}`)
      .set('Authorization', adminBearerToken);
    expect(res.statusCode).toEqual(404);
    done();
  });
});

describe('Get all users from admin account', () => {
  it('should return all users', async (done) => {
    const res = await request(app)
      .get(`/api/users`)
      .set('Authorization', adminBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Get all users from non admin account', () => {
  it('should return not authorized to get users', async (done) => {
    const res = await request(app)
      .get(`/api/users`)
      .set('Authorization', labBearerToken);
    expect(res.statusCode).toEqual(401);
    done();
  });
});

//Patient routes

describe('Post patient', () => {
  it('should create a new patient', async (done) => {
    const res = await request(app)
      .post('/api/patients')
      .set('Authorization', prelevationBearerToken)
      .send({
        name: 'Cristescu',
        surname: 'Marcel',
        cnp: '1550707354432',
        addressID: 'Str. Timiș, bl. 34A, ap.2, Timișoara, Timiș',
        phoneNumber: '0749683909',
      });
    createdPatient = res.body._id;
    expect(res.statusCode).toEqual(201);
    done();
  });
});

describe('Post patient for testing', () => {
  it('should create a new patient for testing', async (done) => {
    const res = await request(app)
      .post('/api/patients')
      .set('Authorization', prelevationBearerToken)
      .send({
        name: 'Paulescu',
        surname: 'Anamaria',
        cnp: '2550707354432',
        addressID: 'Str. Linistei, nr. 33, Timișoara, Timiș',
        phoneNumber: '0749683909',
      });
    createdPatientForTest = res.body._id;
    expect(res.statusCode).toEqual(201);
    done();
  });
});

describe('Post patient with existing CNP', () => {
  it('should throw error already existing patient', async (done) => {
    const res = await request(app)
      .post('/api/patients')
      .set('Authorization', prelevationBearerToken)
      .send({
        name: 'Cristescu',
        surname: 'Marcel-Dorin',
        cnp: '1550707354432',
        addressID: 'Str. Timiș, nr. 4, Timișoara, Timiș',
        phoneNumber: '0749683909',
      });
    expect(res.statusCode).toEqual(409);
    done();
  });
});

describe('Get existing patient', () => {
  it('should return pacient', async (done) => {
    const res = await request(app)
      .get(`/api/patients/${createdPatient}`)
      .set('Authorization', prelevationBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Get not existing patient', () => {
  it('should return not existing patient', async (done) => {
    const res = await request(app)
      .get(`/api/patients/${notExistingPatientId}`)
      .set('Authorization', prelevationBearerToken);
    expect(res.statusCode).toEqual(404);
    done();
  });
});

describe('Update existing patient', () => {
  it('should return updated info', async (done) => {
    const res = await request(app)
      .put(`/api/patients/${createdPatient}`)
      .set('Authorization', prelevationBearerToken)
      .send({
        surname: 'Marcel',
      });
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Update not existing patient', () => {
  it('should return no patient to update', async (done) => {
    const res = await request(app)
      .put(`/api/patients/${notExistingPatientId}`)
      .set('Authorization', prelevationBearerToken);
    expect(res.statusCode).toEqual(404);
    done();
  });
});

describe('Get all patients', () => {
  it('should return all patients', async (done) => {
    const res = await request(app)
      .get(`/api/patients`)
      .set('Authorization', prelevationBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Get all patients not logged in', () => {
  it('should return not authorized to list patients', async (done) => {
    const res = await request(app).get(`/api/patients`);
    expect(res.statusCode).toEqual(401);
    done();
  });
});

//Test routes

describe('Create test', () => {
  it('should return successfully created test', async (done) => {
    const res = await request(app)
      .post(`/api/tests`)
      .set('Authorization', prelevationBearerToken)
      .send({
        prelevationDate: new Date(),
        patient: createdPatientForTest,
        testReportNumber: 10,
        collectedBy: createdPrelevationUser,
      });
    createdTest = res.body._id;
    expect(res.statusCode).toEqual(201);
    done();
  });
});

describe('Create test not logged in', () => {
  it('should return error cannot create test entry', async (done) => {
    const res = await request(app).post(`/api/tests`).send({
      prelevationDate: new Date(),
      patient: createdPatientForTest,
      testReportNumber: 10,
      collectedBy: createdPrelevationUser,
    });
    expect(res.statusCode).toEqual(401);
    done();
  });
});

describe('Create test with wrong data', () => {
  it('should return error data not valid', async (done) => {
    const res = await request(app)
      .post(`/api/tests`)
      .set('Authorization', prelevationBearerToken)
      .send({
        prelevationDate: new Date(),
        patient: createdPatientForTest,
        testReportNumber: 'abc',
      });
    expect(res.statusCode).toEqual(500);
    done();
  });
});

describe('Add test result', () => {
  it('should return test result successfully added', async (done) => {
    const res = await request(app)
      .put(`/api/tests/${createdTest}`)
      .set('Authorization', labBearerToken)
      .send({
        resultDate: new Date(),
        status: 'Pozitiv',
        resultBy: createdLabUser,
      });
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Add test result with wrong status', () => {
  it('should return test status not valid', async (done) => {
    const res = await request(app)
      .put(`/api/tests`)
      .set('Authorization', labBearerToken)
      .send({
        resultDate: new Date(),
        status: 'Positiv',
        resultBy: createdLabUser,
      });
    expect(res.statusCode).toEqual(400);
    done();
  });
});

describe('Get all tests for patient', () => {
  it('should return all tests for patient', async (done) => {
    const res = await request(app)
      .get(`/api/tests/patient/${createdPatientForTest}`)
      .set('Authorization', prelevationBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Get all tests as admin', () => {
  it('should return all tests', async (done) => {
    const res = await request(app)
      .get(`/api/tests`)
      .set('Authorization', adminBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Get all tests non admin', () => {
  it('should return not authorized to get all tests', async (done) => {
    const res = await request(app)
      .get(`/api/tests`)
      .set('Authorization', labBearerToken);
    expect(res.statusCode).toEqual(401);
    done();
  });
});

describe('Edit test admin', () => {
  it('should return test successfully edited', async (done) => {
    const res = await request(app)
      .get(`/api/tests`)
      .set('Authorization', adminBearerToken)
      .send({
        resultDate: new Date(),
      });
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Edit test non admin', () => {
  it('should return not authorized to edit test', async (done) => {
    const res = await request(app)
      .get(`/api/tests`)
      .set('Authorization', prelevationBearerToken)
      .send({
        resultDate: new Date(),
      });
    expect(res.statusCode).toEqual(401);
    done();
  });
});

//Delete users

describe('Delete existing user from non admin account', () => {
  it('should return not authorized as admin to delete user', async (done) => {
    const res = await request(app)
      .delete(`/api/users/${createdPrelevationUser}`)
      .set('Authorization', prelevationBearerToken);
    expect(res.statusCode).toEqual(401);
    done();
  });
});

describe('Delete non existing user from admin account', () => {
  it('should return not existing user to delete', async (done) => {
    const res = await request(app)
      .delete(`/api/users/${notExistingUserId}`)
      .set('Authorization', adminBearerToken);
    expect(res.statusCode).toEqual(404);
    done();
  });
});

describe('Delete existing prelevation user from admin account', () => {
  it('should return prelevation user deleted', async (done) => {
    const res = await request(app)
      .delete(`/api/users/${createdPrelevationUser}`)
      .set('Authorization', adminBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Delete existing lab user from admin account', () => {
  it('should return lab user deleted', async (done) => {
    const res = await request(app)
      .delete(`/api/users/${createdLabUser}`)
      .set('Authorization', adminBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});

describe('Delete existing admin user from admin account', () => {
  it('should return admin user deleted', async (done) => {
    const res = await request(app)
      .delete(`/api/users/${createdAdminUser}`)
      .set('Authorization', adminBearerToken);
    expect(res.statusCode).toEqual(200);
    done();
  });
});
