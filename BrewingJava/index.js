const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

// dynamically allows port number to be updated based on what outside service sets it to and if a port number isnt provided it assigns 8080
const PORT = process.env.PORT || 4000;

// converts to JSON
app.use(express.json());
// show port function
app.listen(PORT, () => console.log(`online on http://localhost:${PORT}`));

app.use(express.urlencoded({ extended: true }));
// receieves data from source (postman)
app.post("/agent", (req, res) => {
  const { id, state } = req.body;
  console.debug("id : " + id);
  console.debug("state : " + state);
  const data = [];
  data.push({ id, state });
  //sends a specfic error message to source if a agent id is not listed. (there should always be a id in data)
  if (!id) {
    res.status(418).send({ message: "No Agent ID found" });
  }

  //response to source showing the data was succesfully captured -- testing only goes to postman
  else {
    res.send({
      agent: `agent state = ${state} and ID = ${id}`,
    });
  }
  // send data to local host /agent/data directory so we can capture by frontend
  app.get("/agent/data", (req, res) => {
    res.json(data);
  });
});
