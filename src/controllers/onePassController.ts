import { connectToOnePass, extractCredentialsFromItem, listVaultItems } from '../services/onePassService';
import { ITenantCredentials } from '../types';
import { logger, variables } from '../utils';

/**
 * Fetches credentials from the OnePass service.
 *
 * @async
 * @function fetchCredentials
 * @returns {Promise<ITenantCredentials[]>} A promise that resolves to an array of credentials.
 */
export async function fetchCredentials(): Promise<ITenantCredentials[]> {
  const op = connectToOnePass();
  const items = await listVaultItems(op, variables.VAULT_ID);
  if (!items.length) logger.info(`No items found for vault ${variables.VAULT_ID}`);
  const credentials = await Promise.all(items.map(async (i) => extractCredentialsFromItem(op, variables.VAULT_ID, i)));
  return credentials.filter((i): i is ITenantCredentials => typeof i?.url === 'string');
}
