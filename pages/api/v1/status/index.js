import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const postgresVersionResult = await database.query("SHOW server_version;");
  const postgresVersionValue = postgresVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const connectionsActiveResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1 and state = 'active';",
    values: [databaseName],
  });
  const connectionsActiveValue = connectionsActiveResult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: postgresVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        connections_active: connectionsActiveValue,
      },
    },
  });
}

export default status;
