import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("POST API should is 200 status code", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response1.status).toBe(201);
  const response1Body = await response1.json();

  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response2.status).toBe(200);
  const response2Body = await response2.json();

  expect(response2Body.length).toBe(0);

  const pgMigrationsQuery = await database.query("select * from pgmigrations");
  const pgMigrations = pgMigrationsQuery.rows;

  expect(pgMigrations.length).toBeGreaterThan(0);
});
