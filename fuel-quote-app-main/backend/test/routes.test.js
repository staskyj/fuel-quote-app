const supertest = require("supertest");
const app = require("../server");

describe("POST /api/users", () => {
    it("should register a new user", async () => {
        const userData = {
            username: "qwerty",
            email: "qwerty@example.com",
            password: "testpassword",
            state: "California",
            city: "Los Angeles"
        };

        const response = await request(server)
            .post("/api/users")
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("username", userData.username);
        expect(response.body).toHaveProperty("email", userData.email);
        expect(response.body).toHaveProperty("state", userData.state);
        expect(response.body).toHaveProperty("city", userData.city);
    });
});