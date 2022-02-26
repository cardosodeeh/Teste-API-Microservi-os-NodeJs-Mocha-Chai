import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request(app);
const expect = chai.expect;

describe('get', () => {
    it('Deve retornar uma lista', (done) => {
        done()
    })
})