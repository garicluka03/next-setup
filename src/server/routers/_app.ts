import { router } from "../trpc";
import { authRouter } from "./auth";
import { helloRouter } from "./hello";

export const appRouter = router({
    auth: authRouter,
    hello: helloRouter,
});

export type AppRouter = typeof appRouter;
