import 'dotenv/config';
import * as zg from 'zapatos/generate';
await zg.generate({
  db: {
    connectionString: process.env.DATABASE_URL,
  },
  "outDir": "./src",
	"schemas": {
		"public": {
			"include": "*",
			"exclude": [
				"geography_columns",
				"geometry_columns",
				"knex_migrations",
				"knex_migrations_lock"
			]
		},
		"people": {
			"include": "*",
			"exclude": []
		},
		"website": {
			"include": "*",
			"exclude": []
		},
		"communications": {
			"include": "*",
			"exclude": []
		},
		"events": {
			"include": "*",
			"exclude": []
		},
		"petitions": {
			"include": "*",
			"exclude": []
		}
	},
	"unprefixedSchema": "public"
});