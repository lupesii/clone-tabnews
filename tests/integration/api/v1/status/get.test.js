test("GET API should is 200 status code", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);
  const responseBody = await response.json();

  const parsedUpdateAT = new Date(responseBody.update_at).toISOString();
  expect(parsedUpdateAT).toEqual(responseBody.update_at);

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(responseBody.dependencies.database.connections_active).toBeDefined();
  expect(responseBody.dependencies.database.connections_active).toEqual(1);
});
