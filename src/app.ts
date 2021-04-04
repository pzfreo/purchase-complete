import express from "express";
import { RegisterRoutes } from "./generated/routes";
import * as swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
const swaggerDocument = import('./generated/swagger.json');
import { introspect } from "@pzfreo/express-introspect";


export const app = express();

// read sent json payloads

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, 
  async (_req: express.Request, res: express.Response) => {
    return res.send(swaggerUi.generateHTML(await swaggerDocument));
});

const client_id = 'purchase';
const client_secret = process.env.CLIENT_SECRET;
const oauth2_host = process.env.OAUTH2_HOST || "localhost";
const oauth2_port = process.env.OAUTH2_PORT || 8080;

const introspect_url = `http://${oauth2_host}:${oauth2_port}/realms/purchase/protocol/openid-connect/token/introspect`;

app.use(introspect(introspect_url,client_id,client_secret));


// standard type validation for tsoa
app.use(function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

RegisterRoutes(app);

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`Purchase app listening at http://localhost:${port}`)
);