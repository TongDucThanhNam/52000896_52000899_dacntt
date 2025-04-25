import {OpenAPIHono} from "@hono/zod-openapi";
import {drizzle} from 'drizzle-orm/d1';
import cartRoutes from "./Api/Routes/CartRoutes";
import interactionRoutes from "./Api/Routes/InteractionRoutes";
import productRoutes from "./Api/Routes/ProductRoutes";
import {UnitOfWorkFactory} from './Infrastructure/Persistences/Factories/UnitOfWorkFactory';
import transactionRoutes from './Api/Routes/TransactionRoutes';
import userRoutes from './Api/Routes/UserRoutes';
import {DbContext} from './Infrastructure/Persistences/Config/db';
import {cors} from 'hono/cors'
import {jwt, JwtVariables} from "hono/jwt";

export type Env = {
    D1Database: D1Database; // <BINDING_NAME>: D1Database;
}

type Variables = JwtVariables

const app = new OpenAPIHono<
    {
        Bindings: Env,
        JwtVariables: Variables,
    }
>();

app.use('/api/*', cors(
    {
        origin: '*',
    }
))


// Initialize the DbContext and UnitOfWorkFactory with the environment for each request
app.use('*', async (c, next) => {
    // Initialize the DbContext with the environment
    DbContext.getInstance().initialize(c.env);

    // Initialize the UnitOfWorkFactory with the environment
    UnitOfWorkFactory.getInstance().initialize(c.env);

    await next();
});

app.route('/api', cartRoutes);
app.route('/api', interactionRoutes);
app.route('/api', productRoutes);
app.route('/api', transactionRoutes);
app.route('/api', userRoutes);

export default app