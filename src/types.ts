import { OnePasswordConnect } from '@1password/connect';

export type OPConnect = ReturnType<typeof OnePasswordConnect>;

export interface ITenantCredentials {
  client_id: string;
  client_secret: string;
  url: string;
}

export enum CredentialFields {
  client_id = 'client_id',
  client_secret = 'client_secret',
  url = 'url',
}
