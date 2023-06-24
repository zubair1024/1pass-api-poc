import dotenv from 'dotenv';
dotenv.config();

/**
 * Object containing environment variables.
 *
 * @constant {object} variables
 * @property {string} ONE_PASS_SERVER_URL - The URL of the OnePass connect server.
 * @property {string} ONE_PASS_SERVER_TOKEN - The token for accessing the OnePass connect server.
 * @property {string} VAULT_ID - The ID of the vault.
 */
export const variables = {
  ONE_PASS_SERVER_URL: process.env.ONE_PASS_SERVER_URL ?? '',
  ONE_PASS_SERVER_TOKEN: process.env.ONE_PASS_SERVER_TOKEN ?? '',
  VAULT_ID: process.env.VAULT_ID ?? '',
  CRON_TAB: process.env.CRON_TAB ?? '5 * * * *',
  TIMEZONE: process.env.TIMEZONE ?? 'Europe/Berlin',
};
