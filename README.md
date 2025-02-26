Coding challenge for aiimi

- Open .sln in Visual Studio (2022 community edition)
- Download the project's nuget dependencies if VS didn't already do so.
- Run as debug/http.
- If the browser isn't launched, browse to http://localhost:5237/ to see the frontend or http://localhost:5237/api/People to see the backend.

NPM isn't needed as the frontend is in wwwroot with `UseStaticFiles` so everything is in one webserver.

The browser does need to have an internet connection for access the Vue library.
