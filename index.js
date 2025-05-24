const express = require('express');
const { config } = require('dotenv');
const app = express();



app.use(express())
app.use(express.json());

const PORT = process.config.PORT || 3000;


app.get('/', (req, res) => {
  res.send("nirapadak");
})

app.get('/list', (req, res) => {
  res.json({
    "name": "nirapadk",
    "age": 34
  });
})



app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:3000`)
})
