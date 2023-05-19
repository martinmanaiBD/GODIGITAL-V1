module.exports = {
    development: {
      username: 'doadmin',
      password: 'AVNS_5aCodYz6-TNAvisuLMs',
      database: 'defaultdb',
      host: 'db-postgresql-sgp1-34671-do-user-13699698-0.b.db.ondigitalocean.com',
      port: 25060,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };