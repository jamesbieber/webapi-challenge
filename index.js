const server = require("./server");

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("\n ~~~ Server running on http://localhost:3000 ~~~ \n");
});
