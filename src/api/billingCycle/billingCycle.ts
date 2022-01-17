import restful from "node-restful";
const mongoose = restful.mongoose;

const creditSchema = new mongoose.Schema({
  name: { type: String, required: [true, "The credit 'Name' is required"] },
  value: {
    type: Number,
    min: 0,
    required: [true, "The credit 'Value' is required"],
  },
});

const debtSchema = new mongoose.Schema({
  name: { type: String, required: [true, "The debit 'Name' is required"] },
  value: {
    type: Number,
    min: 0,
    required: [true, "The debit 'Value' is required"],
  },
  status: {
    type: String,
    required: false,
    uppercase: true,
    enum: ["PAGO", "PENDENTE", "AGENDADO"],
  },
});

const billingCycleSchema = new mongoose.Schema({
  name: { type: String, required: [true, "The billing 'Name' is required"] },
  month: {
    type: Number,
    min: 1,
    max: 12,
    required: [true, "The billing 'Month' is required"],
  },
  year: {
    type: Number,
    min: 1970,
    max: 2100,
    required: [true, "The billing 'Year' is required"],
  },
  credits: [creditSchema],
  debts: [debtSchema],
});

module.exports = restful.model("BillingCycle", billingCycleSchema);
