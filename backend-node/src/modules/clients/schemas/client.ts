import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  cellphone: { type: String, required: true },
  address: { type: String, required: true },
});

export const clientModel = mongoose.model("Client", clientSchema);
