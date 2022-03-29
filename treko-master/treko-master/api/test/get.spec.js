import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('get', () => {

    // before((done) => {
    //     tasksModel.deleteMany({});
    //     done();
    // })

    context('quando eu tenho tarefas cadastradas', () => {

        before((done) => {
            let tasks = [
                {title: 'Estudar NodeJs', email: 'eu@andreza.io', done: false},
                {title: 'Estudar MongoDB', email: 'eu@andreza.com', done: false},
                {title: 'Fazer Compras', email: 'eu@andreza.br', done: true}
            ]

            tasksModel.insertMany(tasks);
            done();
        })

        it('Deve retornar uma lista', (done) => {
            request
                .get('/task')
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        })

        it('Deve filtrar por palavra chave', (done) => {
            request
                .get('/task')
                .query({title: 'Estudar'})
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data[0].title).to.equal('Estudar NodeJs');
                    expect(res.body.data[1].title).to.equal('Estudar MongoDB');
                    done();
                });
        });
    });

    context('quando busco por id', () => {

        it('deve retornar uma única tarefa', (done) => {

            let tasks = [
                {title: 'Ler um livro de JS', email: 'eu@andreza.io', done: false}
            ]

            tasksModel.insertMany(tasks, (err,result) => {
                let id = result[0]._id
                request
                    .get('/task/' + id)
                    .end((err,res) => {
                        expect(res).to.has.status(200);
                        expect(res.body.data.title).to.equal(tasks[0].title)
                        done();
                    });
            });
        });
    });
});