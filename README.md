# articles-manager

Please follow these steps to run the application localy:

1) Clone the repository using **git clone https://github.com/DelFlumen/articles-manager.git**
2) Add .env file in the root directory with following variables:
   
   DATABASE_URL=<YOUR_POSTGRESQL_DB_URL>
   ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC=86400000
   JWT_SECRET=<YOUR_JWT_SECRET_KEY>

4) Run npm i in the root directory
5) Run npx prisma generate in the apps/api
6) Run npm run dev in the root directory
7) Open http://localhost:8000 in the browser
8) Log in using following credentials:

   email: "admin@newmail.com"
   password: "password"
   
10) Enjoy managing articles!
