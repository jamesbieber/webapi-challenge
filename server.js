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
      <li><strong>get()</strong> Get requests can be made to both <strong>localhost3000/api/projects</strong> and <strong>localhost3000/api/actions</strong> with an ID if you wish.</li>
      <li><strong>insert()</strong> Post requests can be made to both <strong>localhost3000/api/projects</strong> and <strong>localhost3000/api/actions</strong>.</li>
      <li><strong>update()</strong> Updates can be made to both <strong>localhost3000/api/projects</strong>/:id and <strong>localhost3000/api/actions</strong>/ ID is required for projects, but provided in body for actions.</li>
      <li><strong>remove()</strong> Delete requests can be made to both <strong>locahost3000/api/projects/:id</strong> and <strong>localhost3000/api/actions</strong>/:id.</li>
    </ul>
  `);
});

module.exports = server;
