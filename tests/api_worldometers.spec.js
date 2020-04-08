var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('TESTING /countries', () => {
    it('/countries', (done) => {
        chai.request(app)
            .get('/countries')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/countries/ get correct properties', (done) => {
        chai.request(app)
            .get('/countries/usa')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/countries/ get correct alternate name', (done) => {
        chai.request(app)
            .get('/countries/united%20states')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/ get correct ios2', (done) => {
        chai.request(app)
            .get('/countries/us')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/ get correct id', (done) => {
        chai.request(app)
            .get('/countries/840')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('USA');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/uk', (done) => {
        chai.request(app)
            .get('/countries/uk')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country').eql('UK');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/diamond%20princess', (done) => {
        chai.request(app)
            .get('/countries/diamond%20princess')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('country');
                res.body.should.have.property('countryInfo');
                done();
            });
    });

    it('/countries/ get incorrect country name', (done) => {
        chai.request(app)
            .get('/countries/asdfghjkl')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/all', (done) => {
        chai.request(app)
            .get('/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/all has correct properties', (done) => {
        chai.request(app)
            .get('/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('affectedCountries');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                done();
            });
    });

    it('/states', (done) => {
        chai.request(app)
            .get('/states')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/states?sort works', (done) => {
        chai.request(app)
            .get('/states?sort=cases')
            .end((err, res) => {
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            });
    });

    it('/states?sort bad param', (done) => {
        chai.request(app)
            .get('/states?sort=gsdfb325fsd')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/states/state works', (done) => {
        chai.request(app)
            .get('/states/Illinois')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.state.should.equal("Illinois");
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('active');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });
    
    it('/states/state1,state2', (done) => {
        chai.request(app)
            .get('/states/Illinois,New%20York')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                for(var row of res.body){
                    row.should.have.property('cases');
                    row.should.have.property('todayCases');
                    row.should.have.property('deaths');
                    row.should.have.property('todayDeaths');
                    row.should.have.property('active');
                    row.should.have.property('tests');
                    row.should.have.property('testsPerOneMillion');
                }
                done();
            });
    });

    it('/states/ get incorrect state name', (done) => {
        chai.request(app)
            .get('/states/asdfghjkl')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/yesterday', (done) => {
        chai.request(app)
            .get('/yesterday')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/yesterday/all', (done) => {
        chai.request(app)
            .get('/yesterday/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/yesterday/all has correct properties', (done) => {
        chai.request(app)
            .get('/yesterday/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('affectedCountries');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/yesterday/all is less than countries/all', (done) => {
        chai.request(app)
            .get('/yesterday/all')
            .end((err, res) => {
                chai.request(app)
                    .get('/all')
                    .end((err2, res2) => {
                        res.should.have.status(200);
                        res2.should.have.status(200);
                        res2.body.cases.should.be.at.least(res.body.cases);
                        done();
                    });
            });
    });

    it('/yesterday/us has correct properties', (done) => {
        chai.request(app)
            .get('/yesterday/us')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('cases');
                res.body.should.have.property('todayCases');
                res.body.should.have.property('deaths');
                res.body.should.have.property('todayDeaths');
                res.body.should.have.property('casesPerOneMillion');
                res.body.should.have.property('updated');
                res.body.should.have.property('tests');
                res.body.should.have.property('testsPerOneMillion');
                done();
            });
    });

    it('/yesterday?sort works', (done) => {
        chai.request(app)
            .get('/yesterday?sort=cases')
            .end((err, res) => {
                res.should.have.status(200);
                let maxCases = res.body[0].cases;
                res.body.forEach(element => {
                    maxCases.should.be.at.least(element.cases);
                    maxCases = element.cases;
                });
                done();
            });
    });

    it('/yesterday/country works', (done) => {
        chai.request(app)
            .get('/yesterday/China')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('China');
                done();
            });
    });

    it('/yesterday/country works id', (done) => {
        chai.request(app)
            .get('/yesterday/156')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('China');
                done();
            });
    });

    it('/yesterday/country works iso', (done) => {
        chai.request(app)
            .get('/yesterday/chn')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('China');
                done();
            });
    });

    it('/yesterday/country incorrect name', (done) => {
        chai.request(app)
            .get('/yesterday/fsih8475gife')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/yesterday/countrylist works', (done) => {
        chai.request(app)
            .get('/yesterday/156,america, brA')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(3);
                res.body[0].country.should.equal('China');
                res.body[1].country.should.equal('USA');
                res.body[2].country.should.equal('Brazil');
                done();
            });
    });

    it('/yesterday/countrylist with incorrect name', (done) => {
        chai.request(app)
            .get('/yesterday/156,fhligu')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('China');
                done();
            });
    });

    it('/yesterday/countrylist with incorrect names', (done) => {
        chai.request(app)
            .get('/yesterday/156,fhligu, gsiugshg, usa')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(2);
                res.body[0].country.should.equal('China');
                res.body[1].country.should.equal('USA');
                done();
            });
    });
});
