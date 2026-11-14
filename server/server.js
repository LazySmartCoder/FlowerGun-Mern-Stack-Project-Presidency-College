const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FlowerGun API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const sampleProducts = [
  {
    name: "Anime Poster Pack",
    description: "A set of 6 high quality anime posters for your room.",
    price: 499,
    image: "https://picsum.photos/seed/poster/400/300",
    category: "Posters",
    stock: 25,
  },
  {
    name: "Manga Volume 1",
    description: "The first volume of a popular manga series.",
    price: 299,
    image: "https://picsum.photos/seed/manga/400/300",
    category: "Books",
    stock: 40,
  },
  {
    name: "Anime Keychain",
    description: "Cute metal keychain of your favourite character.",
    price: 149,
    image: "https://picsum.photos/seed/keychain/400/300",
    category: "Accessories",
    stock: 100,
  },
  {
    name: "Hero Hoodie",
    description: "Comfortable hoodie with an anime inspired design.",
    price: 999,
    image: "https://picsum.photos/seed/hoodie/400/300",
    category: "Clothing",
    stock: 15,
  },
];

const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(sampleProducts);
    console.log("Sample products added");
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedProducts();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
