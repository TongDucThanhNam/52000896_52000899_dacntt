import express from "express";
import morgan from "morgan";

import cors from "cors";
import "dotenv/config";

import swaggerUi from "swagger-ui-express";

import swaggerFile from "./swagger_output.json";

const PORT = process.env.PORT;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//------------------Handle Error------------------//
//error handler
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

//404 handler
app.use((req: any, res: any, next: any) => {
    res.status(404).json(
        {
            message: "Resource not found",
            status: 404
        }
    )
});