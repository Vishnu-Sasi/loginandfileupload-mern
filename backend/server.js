const mongoose = require("mongoose");
const app = require("./app");

const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://vishnu:logintask@loginassignment.vj4rgif.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Database connection error:", error));
