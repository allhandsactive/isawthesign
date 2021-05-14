const chai = require("chai");
const request = require("supertest");
const winston = require("winston");

const app = require("../src/server");

chai.should();
winston.add(new winston.transports.Console({ silent: true }));

describe("server", () => {
  // header X-Powered-By should not exist
  it("should have the proper helmet protections", (done) => {
    request(app(winston, "controller", "staff"))
      .get("/state")
      .expect(
        "Strict-Transport-Security",
        "max-age=15552000; includeSubDomains",
      )
      .expect((res) => {
        res.header.should.not.have.property("x-powered-by");
      })
      .expect(200, done);
  });

  // header X-Powered-By should not exist
  it("should have the proper caching", (done) => {
    request(app(winston, "controller", "staff"))
      .get("/state")
      // caching
      .expect(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate",
      )
      .expect("Expires", "0")
      .expect("Pragma", "no-cache")
      .expect("Surrogate-Control", "no-store")
      .expect(200, done);
  });
});
