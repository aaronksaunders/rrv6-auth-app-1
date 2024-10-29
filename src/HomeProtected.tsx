import { Link, useRouteLoaderData } from "react-router-dom";

const HomeProtected = () => {
    const parentLoaderData = useRouteLoaderData('app') as { message: string, token: string };
    return (
        <div>
            <h1>Home Protected</h1>
            <div>
                <h3>Message: {parentLoaderData?.message}</h3>
                <h3>Token: {parentLoaderData?.token}</h3>
            </div>
            <Link to="/">Back to Home</Link>
        </div>
    );
};
export default HomeProtected;