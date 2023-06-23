import { fetchCredentials } from './controllers/onePassController';
import { logger } from './utils';

async function run() {
  const credentials = await fetchCredentials();
  logger.info(credentials);
}

run().catch((err) => {
  logger.error(err);
  process.exit(1);
});
