const app = require('../index');

describe('APP', ()=> {
    describe('GET /apps', () => {
        it('should return an array of apps');

        it('should reutrn 400 if `sort` query is invalid');

        it('should return array of apps sorted by app name');
    });
});