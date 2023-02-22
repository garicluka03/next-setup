import Auth from "./auth";
import { trpc } from "../utils/trpc";

export default function Home() {
    const hello = trpc.hello.name.useQuery("luka");
    return (
        <div>
            <Auth />
            <div>{hello?.data?.message}</div>
        </div>
    );
}
