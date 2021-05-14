describe("/state", () => {
  describe("GET", () => {
    it("should respond with false initially");
  });

  describe("PUT", () => {
    // make sure to test setting true and false
    it("should require auth");
    it("should respond with 204");
    it("should update what is returned by GET /state");
  });
});
