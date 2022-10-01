import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', () => {

  let chaiHttpResponse: Response;

  describe('/matches', () => {

    it('testa que é possível criar uma partida', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjQ1NjM3ODgsImV4cCI6MTY2NTE2ODU4OH0.khgH3RpwzS4o_DKX8UOPn2xJcRgkjTwjsq83sb5tWh4' })
        .send({
          "homeTeam": 11,
          "awayTeam": 10,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        })
      expect(chaiHttpResponse.status).to.equal(201)
    });

    it('testa que não é possível criar uma partida sem um token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        // .set({ "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjQ1NjM3ODgsImV4cCI6MTY2NTE2ODU4OH0.khgH3RpwzS4o_DKX8UOPn2xJcRgkjTwjsq83sb5tWh4' })
        .send({
          "homeTeam": 11,
          "awayTeam": 10,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        })
      expect(chaiHttpResponse.status).to.equal(401)
    });
  })

  describe('/matches/:id/finish', () => {
    it('testa que é possível atribuir a propriedade inProgress=false para uma match', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/5/finish')
      // .set({ "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjQ1NjM3ODgsImV4cCI6MTY2NTE2ODU4OH0.khgH3RpwzS4o_DKX8UOPn2xJcRgkjTwjsq83sb5tWh4' })
      // .send({
      //   "homeTeam": 11,
      //   "awayTeam": 10,
      //   "homeTeamGoals": 2,
      //   "awayTeamGoals": 2
      // })
      expect(chaiHttpResponse.status).to.equal(200)
    });
  });

  describe('/matches/:id/finish', () => {
    it('testa que é possível atualizar os dados de uma partida em progresso', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/42')
        // .set({ "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjQ1NjM3ODgsImV4cCI6MTY2NTE2ODU4OH0.khgH3RpwzS4o_DKX8UOPn2xJcRgkjTwjsq83sb5tWh4' })
        .send({
          "homeTeamGoals": 2,
          "awayTeamGoals": 3
        })
      expect(chaiHttpResponse.status).to.equal(200)
    });
  });
});
