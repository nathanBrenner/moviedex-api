const app = require("./app");

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`server listening on port ${PORT}`);
  }
});
