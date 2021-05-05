const request = require('supertest');
const app = require('../server');

describe('Post Patient', () => {
  it('should create a new patient', async (done) => {
    const res = await request(app).post('/api/patients').send({
      name: 'Ionica',
      surname: 'Doe Test',
      cnp: '6203184124578',
      addressID: 'Stejarilor',
      phoneNumber: '0767676767',
    });
    group_id = res.body.group.id;
    expect(res.statusCode).toEqual(201);
    done();
  });
});
