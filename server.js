const app = require("./app");

const port = process.env.PORT || 8888;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${port}`);
});
