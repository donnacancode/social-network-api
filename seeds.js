const mongoose = require("mongoose");
const { User, Thought } = require("./models");
require("dotenv").config();

// Connect to the database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/socialNetworkDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Sample users
const users = [
  {
    username: "johndoe",
    email: "johndoe@example.com",
  },
  {
    username: "janedoe",
    email: "janedoe@example.com",
  },
  {
    username: "bobsbuilder",
    email: "bob@example.com",
  },
];

// Sample thoughts
const thoughts = [
  {
    thoughtText: "This is my first thought!",
    username: "johndoe",
    reactions: [
      {
        reactionBody: "Nice thought!",
        username: "janedoe",
      },
      {
        reactionBody: "Interesting perspective.",
        username: "bobsbuilder",
      },
    ],
  },
  {
    thoughtText: "Here is another thought.",
    username: "janedoe",
    reactions: [
      {
        reactionBody: "I agree!",
        username: "johndoe",
      },
    ],
  },
  {
    thoughtText: "What a beautiful day!",
    username: "bobsbuilder",
    reactions: [
      {
        reactionBody: "Indeed it is.",
        username: "janedoe",
      },
    ],
  },
];

// Seed the database
const seedDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();

    const createdUsers = await User.insertMany(users);
    console.log("Users seeded:", createdUsers);

    for (const thought of thoughts) {
      const user = await User.findOne({ username: thought.username });
      thought.userId = user._id;
      const createdThought = await Thought.create(thought);
      await User.findByIdAndUpdate(user._id, {
        $push: { thoughts: createdThought._id },
      });
    }

    console.log("Thoughts and reactions seeded!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedDatabase();
