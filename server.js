const express = require("express");
const helmet = require("helmet");
const PRouter = require("./data/routers/projectRouter");
const ARouter = require("./data/routers/actionRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/api/projects", PRouter);
server.use("/api/actions", ARouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to the <strong>WEBAPI Sprint Challenge by James Bieber</strong></h2>
    <ul>
      <li><strong>get()</strong> Get requests can be made to both localhost3000/api/projects and localhost3000/api/actions with an ID if you wish.</li>
      <li><strong>insert()</strong> Post requests can be made to both localhost3000/api/projects and localhost3000/api/actions.</li>
      <li><strong>update()</strong> Updates can be made to both localhost3000/api/projects/:id and localhost3000/api/actions/ ID is required for projects, but provided in body for actions.</li>
      <li><strong>remove()</strong> Delete requests can be made to both locahost3000/api/projects/:id and localhost3000/api/actions/:id.</li>
    </ul>
  `);
});

module.exports = server;
