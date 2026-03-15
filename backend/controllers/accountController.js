const supabase = require("../config/supabaseClient");

const getBalance = async (req, res) => {
  const { data } = await supabase
    .from("users")
    .select("balance")
    .eq("id", req.user.id)
    .single();

  res.json(data);
};

const getStatement = async (req, res) => {
  const { data } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`);

  res.json(data);
};

const transferMoney = async (req, res) => {
  const senderId = req.user.id;
  const { receiverEmail, amount } = req.body;

  const { data: sender } = await supabase
    .from("users")
    .select("*")
    .eq("id", senderId)
    .single();

  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const { data: receiver } = await supabase
    .from("users")
    .select("*")
    .eq("email", receiverEmail)
    .single();

  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" });
  }

  await supabase
    .from("users")
    .update({ balance: sender.balance - amount })
    .eq("id", senderId);

  await supabase
    .from("users")
    .update({ balance: receiver.balance + amount })
    .eq("id", receiver.id);

  await supabase.from("transactions").insert([
    {
      sender_id: senderId,
      receiver_id: receiver.id,
      amount,
      transaction_type: "debit",
    },
    {
      sender_id: senderId,
      receiver_id: receiver.id,
      amount,
      transaction_type: "credit",
    },
  ]);

  res.json({ message: "Transfer successful" });
};

module.exports = { getBalance, getStatement, transferMoney };
