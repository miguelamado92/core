const dotenv = require('dotenv');
const { execSync } = require('child_process');

// Load .env variables
dotenv.config();
const command = `DATABASE_URL=${process.env.DATABASE_URL} GRAPHILE_WORKER_ENDPOINT=${process.env.GRAPHILE_WORKER_ENDPOINT} GRAPHILE_WORKER_TOKEN=${process.env.GRAPHILE_WORKER_TOKEN} npx graphile-worker`;

try {
	console.log(`Starting Graphile Worker queue...`);
	execSync(command, { stdio: 'inherit' });
} catch (error) {
	console.error(`Error: ${error.message}`);
	process.exit(1);
}
