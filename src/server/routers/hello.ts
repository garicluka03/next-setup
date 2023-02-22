import { z } from "zod";
import { procedure, router } from "../trpc";

export const helloRouter = router({
    name: procedure.input(z.string()).query(({ input, ctx }) => {
        console.log(ctx);
        return { message: `Hello, ${input}!` };
    }),
});
