import mongoose from "mongoose";
import * as constants from "../constants/constants";

mongoose.Promise = global.Promise;
export default mongoose.connect(process.env.MONGODB_URI || constants.BASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Error.messages.general.required = constants.PATH_REQUIRED;
mongoose.Error.messages.Number.min = constants.VALUE_CANNOT_BE_LOWER;
mongoose.Error.messages.Number.max = constants.VALUE_CANNOT_BE_HIGHER;
mongoose.Error.messages.String.enum = constants.VALUE_IS_NOT_VALID;
