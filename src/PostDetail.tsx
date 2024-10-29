import { json, Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom"

/**
 * Asynchronous loader function for fetching post details.
 * 
 * This function checks for the presence of a token in local storage.
 * If no token is found, it redirects the user to the login page.
 * Otherwise, it fetches the post details from the JSONPlaceholder API
 * using the post ID provided in the route parameters.
 * 
 * @param {LoaderFunctionArgs} params - The parameters passed to the loader function, including the route parameters.
 * @returns {Promise<Response>} A promise that resolves to a JSON response containing the post details.
 */
export const postDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  console.log("postDetailLoader");
  // if no token, redirect to login
  if (!localStorage.getItem('token')) {
    return redirect("/login");
  }

  const id = params.id;
  const f = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const resp = await f.json()

  return json({
    message: "Post Detail",
    post: resp
  });
}

function PostDetail() {
  const data = useLoaderData() as { message: string, post: any };
  return (
    <>
      <h1>Post Detail</h1>
      {data?.post && <div>
        <h3>{data.message}</h3>
        <h3>{data.post.title}</h3>
        <p>{data.post.body}</p>
        <Link to="/">Back to Home</Link>
      </div>}
    </>
  )
}

export default PostDetail
