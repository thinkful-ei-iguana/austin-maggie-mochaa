const supertest = require('supertest');
const expect = require('chai').expect;

const app = require('../index');


describe('APP', () => {
  describe('GET /apps', () => {
    it('should return an array of apps', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          expect(res.body[0]).to.include.keys(
            'Rating', 'App', 'Genres');
        });
    });

    it('should return 400 if `sort` query is invalid', () => {
      supertest(app)
        .get('/app')
        .query({ sort: 'invalid' })
        .expect(400, { message: 'Sort must be either rating or app' });
    });

    const validSortValues = ['App', 'Rating'];
    validSortValues.forEach(sortValue => {
      it(`should return array of apps sorted by ${sortValue}`, () => {
        supertest(app)
          .get('/books')
          .query({ sort: sortValue })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            let i = 0, sorted = true;
            while (sorted && i < res.body.length - 1) {
              sorted = sorted && res.body[i][sortValue] < res.body[i + 1][sortValue];
              i++;
            }
            expect(sorted).to.be.true;
          })

      });

    })


  });
});