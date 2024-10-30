import {
  Form,
  Link,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";

function App() {
  // Access parent loader data
  const appData = useRouteLoaderData("app") as {
    message: string;
    token: string;
  };

  // Access nearest loader data
  const data = useLoaderData() as {
    message: string;
    posts: { id: number; title: string }[];
  };
  return (
    <>
      <h1>HOME PAGE</h1>
      <h3>
        {data.message} {`"${appData?.token}"`}
      </h3>
      <ul>
        {data.posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <li>{post.title}</li>
          </Link>
        ))}
      </ul>
      <br />
      <Form method="POST">
        <button type="submit">LOGOUT</button>
      </Form>
    </>
  );
}

export default App;
