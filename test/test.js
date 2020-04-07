const app = require('../app');
const chai = require('chai');
const chaiHttp = require("chai-http");
let should = chai.should();

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {

  it("Get GitHub Repositories", done => {
    chai
      .request(app)
      .get("/search")
      .set('Accept', 'application/json')
      .query({'query' : 'SAP-Crystal-Report'})
      .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('total_count');
          res.body.should.have.property('items');
          done();
      });
  });


});



