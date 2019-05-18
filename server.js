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
      <li><strong>get()</strong></li>
      <li><strong>insert()</strong></li>
      <li><strong>update()</strong></li>
      <li><strong>remove()</strong></li>
    </ul>
  `);
});

module.exports = server;
