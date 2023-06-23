import { z } from 'zod';

export const credentialsSchema = z.object({
  client_id: z.string().min(1),
  client_secret: z.string().min(1),
  url: z.string().url(),
});
