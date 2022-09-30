import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  it('testa se login com email/senha corretos funciona', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: "admin@admin.com", password: "secret_admin" }) // peguei as credenciais no arquivo 02_login_validate.test.js
    expect(chaiHttpResponse.status).to.equal(200)
  });

  it('testa se login com email incorreto não funciona', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: "incorreto@admin.com", password: "secret_admin" }) // peguei as credenciais no arquivo 02_login_validate.test.js
    expect(chaiHttpResponse.status).to.equal(401)
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
