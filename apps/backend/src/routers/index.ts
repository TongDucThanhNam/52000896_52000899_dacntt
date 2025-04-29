import { publicProcedure, router } from "../lib/trpc";
import interactionRoutes from "../Api/Routes/InteractionRoutes";
import productRoutes from "../Api/Routes/ProductRoutes";
import { UnitOfWorkFactory } from "../Infrastructure/Persistences/Factories/UnitOfWorkFactory";
import transactionRoutes from "../Api/Routes/TransactionRoutes";
import userRoutes from "../Api/Routes/UserRoutes";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  helloFrom: publicProcedure.query(() => {
    return "CF+Hono+tRPC";
  }),
});
export type AppRouter = typeof appRouter;
