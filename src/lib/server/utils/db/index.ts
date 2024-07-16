import { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } from '$env/static/private';
import { dev } from '$app/environment';
import * as db from 'zapatos/db';

import type * as s from 'zapatos/schema';

import pg from 'pg';

import CERT from '$lib/server/utils/db/cert';

const pool = dev
	? new pg.Pool({
			host: PGHOST,
			user: PGUSER,
			database: PGDATABASE
		})
	: new pg.Pool({
			host: PGHOST,
			user: PGUSER,
			password: PGPASSWORD,
			database: PGDATABASE,
			port: parseInt(PGPORT),
			ssl: { ca: CERT, rejectUnauthorized: false }
		});

pool.on('error', (err) => console.error(err)); // don't let a pg restart kill your app
pool.on('connect', () => console.log('😇 Database connected'));
db.setConfig({ castArrayParamsToJson: true, castObjectParamsToJson: true });
export { pool, db, type s };

//Digital Ocean uses self-signed certificates, but requires sslmode=require. Inside the VPC that should be fine, but if you're using public connection details you need to add rejectUnauthorized: false to the ssl config
/* const pool = dev ? 
  new pg.Pool({ connectionString: DATABASE_URL }) : 
  new pg.Pool({connectionString: DATABASE_URL, ssl: {ca: readFileSync(resolve(__dirname, '../../../../ca-certificate.crt').toString())}});
 */
