import request from 'supertest';
import app from '../server.js';
import generateToken from '../utils/generateToken.js';

const prelevationToken = generateToken('5fd8acfcb2f3e44014453c96');
const bearerToken = `Bearer ${prelevationToken}`;

describe('Post Patient', () => {
  it('should create a new patient', async (done) => {
    const res = await request(app)
      .post('/api/patients')
      .set('Authorization', bearerToken)
      .send({
        name: 'Ionica',
        surname: 'Doe Test',
        cnp: '5000310351578',
        addressID: 'Stejarilor',
        phoneNumber: '0767676767',
      });
    expect(res.statusCode).toEqual(201);
    done();
  });
});
