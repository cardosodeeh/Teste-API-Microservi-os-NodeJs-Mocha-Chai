import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request(app);
const expect = chai.expect;

describe('get', () => {

    context('quando eu tenho tarefas cadastradas', () => {

        before((done) => {
            let tasks = [
                {title: 'Estudar NodeJs', email: 'eu@andreza.io', done: false},
                {title: 'Estudar MongoDB', email: 'eu@andreza.com', done: false},
                {title: 'Estudar Lógica', email: 'eu@andreza.br', done: true}
            ]

            tasksModel.insertMany(tasks);
            done();
        })

        it('Deve retornar uma lista', (done) => {
            request
                .get('/task')
                .end((err,res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        })
    })
})