import express from "express";
import { RegisterRoutes } from "./generated/routes";
import * as swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
const swaggerDocument = import('./generated/swagger.json');


export const app = express();

// read sent json payloads

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, 
  async (_req: express.Request, res: express.Response) => {
    return res.send(swaggerUi.generateHTML(await swaggerDocument));
});

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