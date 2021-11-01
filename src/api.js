const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const helmet = require("helmet");
const serverless = require("serverless-http");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const router = express.Router();
app.use(cors());
app.use(helmet());

const fetchWithToken = (endpoint, method = "GET") => {
  return fetch(`${process.env.API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `token ${process.env.TOKEN}`,
    },
  });
};

router.get("/", (req, res) => {
  res.send("JDKJKFJ");
});

router.get("/:uid", async (req, res) => {
  try {
    const data = await fetchWithToken(`/${req.params.uid}`, "GET");
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

// try {
//   app.listen(PORT, () => {
//     console.log(`Connected successfully on port ${PORT}`);
//   });
// } catch (error) {
//   console.error(`Error occured: ${error.message}`);
// }
