# How to launch 
1. `npm install` - installs all dependencies
2. `echo -e "REACT_APP_API_STAND=http://localhost:8080\nDISABLE_NEW_JSX_TRANSFORM=true" > .env.development.local` - creates PROXY env variable
3. `npm run serve` - launches node server
4. `npm run lint -- --fix` - (optional) fixes linting errors
5. `npm start` - launches presentation layer
