require("dotenv").config();
const app = require("./server");
require("./databa");
app.listen(app.get("port"), () => {
  console.log("servidor iniciado", app.get("port"));
});
