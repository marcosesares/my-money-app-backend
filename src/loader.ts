import serverLoader from "./config/server";
import "./config/database";
import routes from "./config/routes";
routes(serverLoader);
