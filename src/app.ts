// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./generated/routes";
import * as swaggerUi from "swagger-ui-express";
const swaggerDocument = require('./generated/swagger.json');
import { ValidateError } from "tsoa";



export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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