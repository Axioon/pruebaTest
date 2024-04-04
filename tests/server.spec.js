const request = require("supertest");
const server = require("../index");

describe("GET /cafes", () => {
    it('should return status code 200 and an array with at least 1 object', async () => {
        const response = await request(server).get("/cafes");
        expect(response.statusCode).toEqual(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(typeof response.body[0]).toBe('object');
    });
});

describe("DELETE /cafes/:id", () => {
    it('should return status code 404 for non-existing cafe id', async () => {
        const idToDelete = 1000; 
        const token = "Authorization "; 

        const response = await request(server)
            .delete(`/cafes/${idToDelete}`)
            .set("Authorization", token);

        expect(response.statusCode).toBe(404);
    });
});

describe("PUT /cafes", () => {
    it('should return status code 400 for mismatched ids', async () => {
        const cafeToUpdate = { id: 10, name: 'Updated Cafe', location: 'Updated Location' };
        const response = await request(server)
            .put("/cafes/9") 
            .send(cafeToUpdate);
        expect(response.statusCode).toEqual(400);
    });
});

describe("POST /cafes", () => {
    it('should add a new cafe and return status code 201', async () => {
        const newCafe = { id: 10, name: 'New Cafe', location: 'Some Location' };
        const response = await request(server)
            .post("/cafes")
            .send(newCafe);
        expect(response.statusCode).toEqual(201);
    });
});