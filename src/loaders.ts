import { json, LoaderFunctionArgs } from "react-router-dom";

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
export const homeLoader = async ({ params }: LoaderFunctionArgs) => {
  console.log("homeLoader", params);
  // fetch data from jsonplaceholder
  const f = await fetch("https://jsonplaceholder.typicode.com/posts");
  const resp = await f.json();

  return json({
    message: "You are logged in",
    posts: resp.slice(0, 10),
  });
};

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
  console.log("postDetailLoader", params);

  const id = params.id;
  const f = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const resp = await f.json();

  return json({
    message: "Post Detail",
    post: resp,
  });
};
