import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import helmet from "helmet";

import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });
const PORT = process.env.PORT || 5000;

const app = express();
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

app.get("/:uid", async (req, res) => {
  console.log(req.params.uid);
  try {
    const data = await fetchWithToken(`/${req.params.uid}`, "GET").then((r) =>
      r.json()
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

try {
  app.listen(PORT, () => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
