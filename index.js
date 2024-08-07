const express = require("express");
const app = express();

app.use(express.json());

const people = [
  { id: 1, name: "Adnan Rasheed", age: 25, city: "Daharki" },
  { id: 2, name: "Nisar Ahmed", age: 26, city: "Daharki" },
  { id: 3, name: "Naresh Kumar", age: 24, city: "Naya Chorh" },
  { id: 4, name: "Umair Khan", age: 27, city: "Larkana" },
];

app.get("/", async (req, res) => {
  try {
    res.json(people);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/user", async (req, res) => {
  try {
    const newUser = req.body;
    people.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    const index = people.findIndex((item) => item.id === id);

    if (index !== -1) {
      people[index] = { ...people[index], ...updatedData };
      res.json({ message: "User updated successfully", people: people[index] });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/user/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = people.findIndex((item) => item.id === id);
        people.splice(index,1);
        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message)
    }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
