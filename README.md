# Shopping list

Created with Vite

1. start with cloning the repo and creating your own .env file according to .env.example
2. npm install
3. npm run dev
4. Open http://localhost:5173/ in your browser

## IMPORTANT INFO

- The app can run both with and without proper backend connection.
- If VITE_API_URL is specified in .env, it will fetch API. Else it will work with local testdata in test_data folder.
- To test with backend, set VITE_API_URL for example to http://localhost:3000/api

Please keep in mind that not all features such as login, invitations etc. will work in frontend only test mode.

## LOGIN

/login page will accept any username and password if VITE_API_URL is not specified.
