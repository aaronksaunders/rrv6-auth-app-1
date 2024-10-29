import { Form, json, Link, redirect, useLoaderData } from "react-router-dom"


/**
 * Asynchronous function that loads home data.
 * 
 * This function checks if a token is present in local storage. If a token is found,
 * it fetches data from the JSONPlaceholder API and returns a JSON response with a 
 * message and the first 10 posts. If no token is found, it redirects the user to the 
 * login page.
 * 
 * @returns {Promise<Response>} A promise that resolves to a JSON response with a message 
 * and posts if the user is logged in, or a redirection to the login page if not.
 */
export const homeLoader = async () => {
  console.log("homeLoader");
  if (localStorage.getItem('token')) {
    // fetch data from jsonplaceholder
    const f = await fetch("https://jsonplaceholder.typicode.com/posts");
    const resp = await f.json()

    return json({
      message: "You are logged in",
      posts: resp.slice(0, 10)
    });
  } else {
    return redirect("/login");
  }
}

function App() {
  const data = useLoaderData() as { message: string, posts: any[] };
  return (
    <>
      <h1>HOME PAGE</h1>
      <h3>{data.message}</h3>
      <ul>
        {data.posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}><li>{post.title}</li></Link>
        ))}
      </ul>
      <br />
      <Form method="POST">
        <button type="submit">LOGOUT</button>
      </Form>
    </>
  )
}

export default App
