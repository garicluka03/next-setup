import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export default function Auth() {
    const session = useSession();
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const { mutate: register } = trpc.auth.register.useMutation();

    if (session.status === "loading") return <div>Loading...</div>;

    if (session.status === "authenticated")
        return (
            <div>
                <div>logged in as {session.data.user?.name}</div>
                <button onClick={() => signOut()}>log out</button>
            </div>
        );

    return (
        <div>
            <h1>LOGIN</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    signIn("credentials", {
                        username: loginUsername,
                        password: loginPassword,
                    });
                    setLoginUsername("");
                    setLoginPassword("");
                }}
            >
                <p>username:</p>
                <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <p>password:</p>
                <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button>LOGIN</button>
            </form>
            <h1>REGISTER</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    register({
                        username: registerUsername,
                        password: registerPassword,
                    });
                    setRegisterUsername("");
                    setRegisterPassword("");
                }}
            >
                <p>username:</p>
                <input
                    type="text"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
                <p>password:</p>
                <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button>REGISTER</button>
            </form>
        </div>
    );
}
