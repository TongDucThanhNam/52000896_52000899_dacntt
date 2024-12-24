import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import productRouter from "./Api/Routes/ProductRoutes";
import userRouter from "./Api/Routes/UserRoutes";
import cartRoutes from "./Api/Routes/CartRoutes.ts";
import interactionRoutes from "./Api/Routes/InteractionRoutes.ts";
import transactionRoutes from "./Api/Routes/TransactionRoutes.ts";


//------------------Swagger API Documentation------------------//
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
//------------------Swagger API Documentation------------------//

//------------------Express App------------------//
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
//------------------Routes------------------//

app.use("/api", cartRoutes);
app.use("/api", interactionRoutes);
app.use("/api", productRouter);
app.use("/api", transactionRoutes);
app.use("/api", userRouter);
//------------------Routes------------------//

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://${process.env.HOST}:${port}`);
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
//------------------Handle Error------------------//