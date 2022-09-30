import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockAll = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
]

const mockOne = {
  "id": 5,
  "teamName": "Cruzeiro"
}

describe('/teams', () => {

  let chaiHttpResponse: Response;

  describe('/findAll', () => {
    before(async () => {
      sinon
        .stub(TeamModel, "findAll")
        .resolves(mockAll as TeamModel[]);
    });

    after(() => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    })


    it('testa todos os teams cadastrados são listados corretamente', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
      expect(chaiHttpResponse.status).to.equal(200)
    });
  })

  describe('/findById', () => {
    before(async () => {
      sinon
        .stub(TeamModel, "findByPk")
        .resolves(mockOne as TeamModel);
    });

    after(() => {
      (TeamModel.findByPk as sinon.SinonStub).restore();
    })


    it('testa se o item buscado é listado corretamente', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/5')
      expect(chaiHttpResponse.status).to.equal(200)
    });
  })


});
