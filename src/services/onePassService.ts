import { OnePasswordConnect } from '@1password/connect';
import { logger, variables } from '../utils';
import { CredentialFields, ITenantCredentials, OPConnect } from '../types';
import { Item } from '@1password/connect/dist/model/item';
import { credentialsSchema } from '../middlewares/validationSchema';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * Connects to OnePassword using the provided server URL and token.
 * @returns {OPConnect} The OnePassword connection object.
 */
export function connectToOnePass(): OPConnect {
  return OnePasswordConnect({
    serverURL: variables.ONE_PASS_SERVER_URL,
    token: variables.ONE_PASS_SERVER_TOKEN,
    keepAlive: true,
  });
}

/**
 * Retrieves a list of items from a vault in OnePassword.
 * @param {OPConnect} op - The OnePassword connection object.
 * @param {string} [vaultId=variables.VAULT_ID] - The ID of the vault. Defaults to the value in the environment variable.
 * @returns {Promise<Item[]>} A promise that resolves to an array of items.
 * @throws {Error} If the vault with the specified ID cannot be found.
 */
export async function listVaultItems(op: OPConnect, vaultId: string = variables.VAULT_ID) {
  const vault = await op.getVault(vaultId ?? variables.VAULT_ID);
  if (!vault) throw new Error(`Vault with ${vaultId} could not be found`);
  return op.listItems(variables.VAULT_ID);
}

/**
 * Extracts credentials from an item in OnePassword.
 * @param {OPConnect} op - The OnePassword connection object.
 * @param {string} [vaultId=variables.VAULT_ID] - The ID of the vault. Defaults to the value in the environment variable.
 * @param {Item} item - The item from which to extract the credentials.
 * @returns {Promise<ITenantCredentials>} A promise that resolves to the extracted credentials.
 * @throws {Error} If the item ID is missing or if any other error occurs during extraction.
 */
export async function extractCredentialsFromItem(op: OPConnect, vaultId: string = variables.VAULT_ID, item: Item) {
  try {
    const credentials: ITenantCredentials = {
      client_id: '',
      client_secret: '',
      url: '',
    };
    if (!item.id) throw new Error(`Missing item id`);
    const fullItem = await op.getItemById(vaultId, item.id);
    fullItem.fields?.forEach((field) => {
      if (
        (field.label === CredentialFields.client_id ||
          field.label === CredentialFields.client_secret ||
          field.label === CredentialFields.url) &&
        typeof field.value === 'string'
      ) {
        credentials[field.label] = field.value;
      }
    });
    const validatedCredentials = credentialsSchema.parse(credentials);
    return validatedCredentials;
  } catch (err) {
    //handle zod validation errors and throw the rest
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      logger.info(validationError);
      return;
    }
    throw err;
  }
}
