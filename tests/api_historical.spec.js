var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('TESTING /v2/historical', () => {
    it('/v2/historical', (done) => {
        chai.request(app)
            .get('/v2/historical')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/historical/all', (done) => {
        chai.request(app)
            .get('/v2/historical/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/historical/ correct country  name', (done) => {
        chai.request(app)
            .get('/v2/historical/usa')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it ('/v2/historical/ correct number default dates', (done) => {
        chai.request(app)
            .get('/v2/historical')
            .end((err, res) => {
                res.should.have.status(200);
                Object.keys(res.body[0].timeline.cases).length.should.equal(30);
                done();
            });
    });

    it ('/v2/historical/ handles bad date string', (done) => {
        chai.request(app)
            .get('/v2/historical?lastday=rgf3vwre')
            .end((err, res) => {
                res.should.have.status(200);
                Object.keys(res.body[0].timeline.cases).length.should.equal(30);
                done();
            });
    });

    it ('/v2/historical/ correct number specified dates', (done) => {
        chai.request(app)
            .get('/v2/historical?lastdays=15')
            .end((err, res) => {
                res.should.have.status(200);
                Object.keys(res.body[0].timeline.cases).length.should.equal(15);
                done();
            });
    });

    it ('/v2/historical/usa?lastdays=all correct first date', (done) => {
        chai.request(app)
            .get('/v2/historical/usa?lastdays=all')
            .end((err, res) => {
                res.should.have.status(200);
                Object.keys(res.body.timeline.cases)[0].should.equal('1/22/20');
                done();
            });
    });

    it('/v2/historical/diamond%20princess', (done) => {
        chai.request(app)
            .get('/v2/historical/diamond%20princess')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/historical/ correct id', (done) => {
        chai.request(app)
            .get('/v2/historical/156')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/historical/ correct iso3', (done) => {
        chai.request(app)
            .get('/v2/historical/chn')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('/v2/historical/ incorrect country name', (done) => {
        chai.request(app)
            .get('/v2/historical/asdfghjkl')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });

    it('/v2/historical/ correct country name list', (done) => {
        chai.request(app)
            .get('/v2/historical/usa, 156, drc')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/historical/ incorrect province name list', (done) => {
        chai.request(app)
            .get('/v2/historical/usa/sdgdf,gsfd')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('message');
                done();
            });
    });

    it('/v2/historical/ correct province name list', (done) => {
        chai.request(app)
            .get('/v2/historical/156/bejing,hubei')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('/v2/historical/ correct province name list split', (done) => {
        chai.request(app)
            .get('/v2/historical/nl/aruba|mainland|bonaire, sint eustatius and saba')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.equal(3);
                res.body[2].should.have.property('country');
                done();
            });
    });

    it('/v2/historical/ correct country name given province', (done) => {
        chai.request(app)
            .get('/v2/historical/gbr/mainland')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('UK');
                res.body.province.should.equal('mainland');
                done();
            });
    });

    it('/v2/historical/ correct country name', (done) => {
        chai.request(app)
            .get('/v2/historical/oman')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.country.should.equal('Oman');
                done();
            });
    });
});