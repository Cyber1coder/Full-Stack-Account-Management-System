const supabase = require("../config/supabaseClient");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword, balance: 10000 }])
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  const token = generateToken(data[0]);

  res.json({ user: data[0], token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, data.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = generateToken(data);

  res.json({ user: data, token });
};

module.exports = { signup, login };
