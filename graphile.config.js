const preset = {
	worker: {
		connectionString: process.env.DATABASE_URL,
		maxPoolSize: 10,
		pollInterval: 2000,
		preparedStatements: true,
		schema: 'graphile_worker',
		crontabFile: 'graphileworker.crontab',
		taskDirectory: './src/tasks',
		concurrentJobs: 1,
		fileExtensions: ['.js', '.ts', '.cjs', '.mjs']
	}
};

export default preset;
