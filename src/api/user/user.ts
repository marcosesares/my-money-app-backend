import restful from "node-restful";
const userMongoose = restful.mongoose;

const userSchema = new userMongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, min: 6, max: 12, required: true },
});

module.exports = restful.model("User", userSchema);
