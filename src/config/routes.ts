import expressRoutes from "express";
import auth from "./auth";

export default function (server: any) {
  const protectedApi = expressRoutes.Router();
  server.use("/api", protectedApi);
  protectedApi.use(auth);

  const BillingCycle = require("../api/billingCycle/billingCycleService");
  BillingCycle.register(protectedApi, "/billingCycles");

  const openApi = expressRoutes.Router();
  server.use("/oapi", openApi);
  const AuthService = require("../api/user/authService");
  openApi.post("/login", AuthService.login);
  openApi.post("/signup", AuthService.signup);
  openApi.post("/validateToken", AuthService.validateToken);
}
