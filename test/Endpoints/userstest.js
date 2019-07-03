const chai = require('chai');
const { should } = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let userToken
let type = '2 bedroom flat';
let id = '1';
const app = require('../../Server/index');

let userInfo = {
    email: 'emaka@gmail.com',
    password: 'testpassword123',
}
describe('users property endpoints', () => {
    before('Get request token', async () => {
        try {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send(userInfo)
                .end((err, res) => {
                    userToken = res.body.data.token;


                });
        } catch (error) {
            console.log(error);
        }
    });
    describe('GET /property', () => {
        it('should get all property adverts', () => {
            chai.request(app)
                .get('/api/v1/property')
                .end((err, res) => {
                    let result = res.body.data;

                    expect(res.status).to.equal(200)
                    expect(res.body.status).to.be.a('number');
                    expect(result).to.be.an('array');
                    expect(result[0]).to.have.a.property('id');
                    expect(result[0].id).to.be.a('number');
                    expect(result[0]).to.have.a.property('price');
                    expect(result[0].price).to.be.a('number');
                    expect(result[0]).to.have.a.property('status');
                    expect(result[0].status).to.be.a('string');
                    expect(result[0]).to.have.a.property('state');
                    expect(result[0].state).to.be.a('string');
                    expect(result[0]).to.have.a.property('city');
                    expect(result[0].city).to.be.a('string');
                    expect(result[0]).to.have.a.property('address');
                    expect(result[0].address).to.be.a('string');
                    expect(result[0]).to.have.a.property('created_on');
                    expect(result[0].created_on).to.be.a('string');
                    expect(result[0]).to.have.a.property('image_url');
                    expect(result[0].image_url).to.be.a('string');

                })
        })

    })
    describe('GET /property?type=' + type, () => {
        it('should get specific property type', () => {
            chai.request(app)
                .get(`/api/v1/property?type=${type}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal(200);
                    expect(res.body.data).to.be.an('array');
                    expect(res.body).to.have.a.property('data')
                    let result = res.body.data[0];
                    expect(result).to.have.a.property('id');
                    expect(result.id).to.be.a('number');
                    expect(result).to.have.a.property('price');
                    expect(result.price).to.be.a('number');
                    expect(result).to.have.a.property('status');
                    expect(result.status).to.be.a('string');
                    expect(result).to.have.a.property('state');
                    expect(result.state).to.be.a('string');
                    expect(result).to.have.a.property('city');
                    expect(result.city).to.be.a('string');
                    expect(result).to.have.a.property('address');
                    expect(result.address).to.be.a('string');
                    expect(result).to.have.a.property('created_on');
                    expect(result.created_on).to.be.a('string');
                    expect(result).to.have.a.property('image_url');
                    expect(result.image_url).to.be.a('string');

                });
        })
    });

    describe('GET /property/' + id, () => {
        it('should get a specific property', () => {
            chai.request(app)
                .get(`/api/v1/property/${id}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body).to.have.a.property('data')
                    let result = res.body.data;
                    expect(result).to.have.a.property('id');
                    expect(result.id).to.be.a('number');
                    expect(result).to.have.a.property('price');
                    expect(result.price).to.be.a('number');
                    expect(result).to.have.a.property('status');
                    expect(result.status).to.be.a('string');
                    expect(result).to.have.a.property('state');
                    expect(result.state).to.be.a('string');
                    expect(result).to.have.a.property('city');
                    expect(result.city).to.be.a('string');
                    expect(result).to.have.a.property('address');
                    expect(result.address).to.be.a('string');
                    expect(result).to.have.a.property('created_on');
                    expect(result.created_on).to.be.a('string');
                    expect(result).to.have.a.property('image_url');
                    expect(result.image_url).to.be.a('string');

                });
        })
    });

    // describe('DELETE /api/v1/property/id', () => {
    //     it('should delete a specific property', () => {
    //         chai.request(app)
    //             .delete(`/api/v1/property/${id}`)
    //             .set('authorization', 'bearer ' + userToken)
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(200);
    //                 expect(res.body).to.have.property('status');
    //                 expect(res.body.status).to.be.a('string');
    //                 expect(res.body.status).to.equal('success');

    //                 expect(res.body).to.have.property('data');
    //                 expect(res.body.data).to.be.an('object');
    //                 expect(res.body.data).to.have.a.property('message');
    //                 expect(res.body.data.message).to.equal(`property with an id: ${id} has been deleted successfully`);
    //             });
    //     });
    // });

    let newInfo = {
        status: 'sold',
    }
    describe('PATCH /api/v1/property/1', () => {
        it('should return 404 error if property is not found', () => {
            chai.request(app)
                .patch(`/api/v1/property/2`)
                .send(newInfo)
                .set('authorization', 'bearer ' + userToken)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.be.a('string');
                    expect(res.body.status).to.equal('error');
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.a('string');
                    expect(res.body.error).to.equal('property not found');

                });
        });
    });

    describe('PATCH /api/v1/property/1/sold', () => {
        it('should return 404 error if property is not found', () => {
            chai.request(app)
                .patch(`/api/v1/property/2`)
                .send(newInfo)
                .set('authorization', 'bearer ' + userToken)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.be.a('string');
                    expect(res.body.status).to.equal('error');
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.a('string');
                    expect(res.body.error).to.equal('property not found');

                });
        })
    })



    describe('POST /api/v1/property/', () => {
        it('Should return 422 when property is invalid', () => {
            chai.request(app)
                .post('/api/v1/property/')
                .set('authorization', 'bearer ' + userToken)
                .send({})
                
                .end((err, res) => {
                    expect(res.status).to.equal(422);
                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.be.a('string');
                    expect(res.body.status).to.equal('error');
                    expect(res.body).to.have.property('error');
                    expect(res.body.error).to.be.a('string');
                    expect(res.body.error).to.equal('invalid price, invalid state, invalid city, invalid type, invalid image, ');

                });
        })
    })
})
