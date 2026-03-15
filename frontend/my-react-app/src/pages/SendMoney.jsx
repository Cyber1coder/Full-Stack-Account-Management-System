import { useState } from "react";
import axios from "axios";

const SendMoney = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const send = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/account/transfer",
      {
        receiverEmail: email,
        amount,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    alert("Money Sent");
  };

  return (
    <div>
      <h2>Send Money</h2>

      <input
        placeholder="Receiver Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />

      <br />

      <button onClick={send}>Transfer</button>
    </div>
  );
};

export default SendMoney;
