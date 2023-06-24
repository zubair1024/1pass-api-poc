import { fetchCredentials } from './controllers/onePassController';
import { logger, variables } from './utils';
import { CronJob } from 'cron';

/**
 * Runs the main cron job.
 *
 * @async
 * @function run
 */
async function run() {
  const job = new CronJob(
    variables.CRON_TAB,
    async function () {
      const credentials = await fetchCredentials();
      logger.info(credentials);
    },
    function () {
      logger.info(`Job complete at ${new Date().toISOString()} next run at ${job.nextDate()} ✅`);
    },
    false,
    variables.TIMEZONE,
  );

  job.start();

  logger.info(`Job is initialized with cron tab of ${variables.CRON_TAB} next run at ${job.nextDate()}! 🚀`);
}

/**
 * Runs the main cron job and handles any errors.
 *
 * @function run
 */
run().catch((err) => {
  logger.error(err);
  process.exit(1);
});
