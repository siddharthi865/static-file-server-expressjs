import request from "supertest";

import app from "../app.js";

describe("Static File Server", () => {
  it("should return index.html", async () => {
    const res = await request(app).get("/index.html");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Welcome");
  });

  it("should return 404", async () => {
    const res = await request(app).get("/missing.txt");
    expect(res.statusCode).toBe(404);
  });
});
