# POC to use 1Password Connect Server to retrieve Tenant Credentials

## How to run?

1. Copy the `1password-credentials.json` to root folder

1. Run Connect Server

   Use `docker-compose` to run connect server using the `docker-compose.yml` file

   ```shell
   docker-compose up -d
   ```

1. Install dependencies using `npm`

   ```shell
   npm i
   ```

1. Create env variables

   Copy over the `.env` variables

   ```shell
   cp example.env .env
   ```

1. Run the server and the log out print out the credentials using the cron job

   ```shell
   npm run dev
   ```
