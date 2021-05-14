describe("/toggle", () => {
  describe("GET", () => {
    it("should require auth");
    it("should respond with false initially");
    // make sure we're testing that a read resets the toggle to false
  });

  describe("PUT", () => {
    it("should require auth");
    it("should respond with 204");
    it("should update what is returned by GET /state");
  });
});
