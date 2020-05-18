const axios = require('axios');

describe('City', function () {
  describe('#getAllCountries()', function () {
    it('respond with right amount of countries', function () {
      axios.get('http://localhost:8000/cities/getCountries/')
        .catch((err) => {
          if (err) done(err)
        })
        .then((res) => {
          res.data.country.should.have.length(217)
          // done();
        })
    })
  });
});

describe('City', function () {
  describe('#getAllCities()', function () {
    it('respond with right amount of cities', function () {
      axios.post('http://localhost:8000/cities/getCities/', { country: 'France' })
        .catch((err) => {
          if (err) done(err)
        })
        .then((res) => {
          res.data.country.should.have.length(633)
          // done();
        })
    })
  });
});

describe('City', function () {
  describe('#getCity()', function () {
    it('respond with matching city', function () {
      axios.post('http://localhost:8000/cities/getCity/', { id: '2972315' })
        .catch((err) => {
          if (err) done(err)
        })
        .then((res) => {
          expect(res.data.city.city_name).to.equal('Toulouse');
          // done();
        })
    })
  });
});