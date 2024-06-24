# Film festival
-------

Welcome to the Film Festival Project! This project is a web application designed to manage and showcase a film festival, allowing users to view films, book seats, and explore festival information.
The application is built with React and Tailwind CSS for the frontend, and TypeScript for backend using Reddis as database and Axios for API.


## Startup
```
cd film-festival
npm i
npm install -g nx || instalace nx globálně, jinak vždy před nx příkaz dávat npx

npx prisma generate --schema=./apps/backend/prisma/schema.prisma

npx prisma migrate dev --name 'last' --schema=./apps/backend/prisma/schema.prisma

docker run -d --name mydb -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb postgres

docker run --name my-redis-container -p 6379:6379 -d redis

nx serve frontend
nx serve backend
```
- backend http://localhost:4200/
- frontend http://localhost:3000/

-------
