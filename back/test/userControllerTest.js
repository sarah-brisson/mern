const axios = require('axios');

describe('User', function () {
    describe('#login()', function () {
        it('return jwt token', function () {
            axios
                .post('http://localhost:8000/users/login/', { username: 'toto', password: 'test' })
                .catch((err) => {
                    if (err) done(err)
                })
                .then((res) => {
                    expect(res.data.token).to.exist;
                    // done();
                })
        })
    });
});

describe('User', function () {
    describe('#login()', function () {
        it('wrong password', function () {
            axios
                .post('http://localhost:8000/users/login/', { username: 'toto', password: 'tost' })
                .catch((err) => {
                    if (err) {
                        expect(err.response.data.error).to.equal("Invalid Password");
                        // done()
                    }
                })
                .then((res) => {
                    expect(1).to.equal(2);
                    // done();
                })
        })
    });
});

describe('User', function () {
    describe('#login()', function () {
        it('username doesnt exist', function () {
            axios
                .post('http://localhost:8000/users/login/', { username: 'azerty', password: 'tost' })
                .catch((err) => {
                    if (err) {
                        expect(err.response.data.error).to.equal("User does not exist.");
                        done()
                    }
                })
                .then((res) => {
                    expect(1).to.equal(2);
                    // done();
                })
        })
    });
});

describe('User', function () {
    describe('#register()', function () {
        it('user already exist', function () {
            axios.post('http://localhost:8000/users/register/', { username: 'toto', password: '1234' })
                .catch((err) => {
                    if (err) {
                        expect(err.response.data.error).to.equal("This username already exists");
                        done()
                    }
                })
                .then((res) => {
                    expect(1).to.equal(2);
                    // done();
                })
        })
    });
});

describe('User', function () {
    describe('#register()', function () {
        it('user added in database', function () {
            const username = 'test123456';
            axios.post('http://localhost:8000/users/register/', { username: username, password: '1234' })
                .catch((err) => {
                    if (err) {
                        // expect(err.response.data.error).to.equal("This username already exists");
                        done(err)
                    }
                })
                .then((res) => {
                    expect(err.response.data.username).to.equal(username); 
                    // done();
                })
        })
    });
});

describe('User', function () {
    describe('#removeCity()', function () {
        it('remove a city', function () {
            axios.post('http://localhost:8000/users/removeCity/', { city: '2972315', username: 'test1234' })
                .catch((err) => {
                    if (err) done(err)
                })
                .then((res) => {
                    // console.log(res.data.user.cities)
                    expect(res.data.user.cities).to.not.include('2972315');
                    // done();
                })
        })
    });
});

describe('User', function () {
    describe('#getCities()', function () {
        it('get cities of a user', function () {
            axios.post('http://localhost:8000/users/getCities/', { username: 'test1234' })
                .catch((err) => {
                    if (err) done(err)
                })
                .then((res) => {
                    // console.log(res.data.user.cities)
                    res.data.cities.should.have.length(2)
                    // done();
                })
        })
    });
});