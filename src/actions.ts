import { replace } from "react-router-dom";

/**
 * Handles the login action by processing the request's form data.
 *
 * @param {Object} params - The parameters object.
 * @param {Request} params.request - The request object containing form data.
 *
 * @returns {Promise<Object|Response>} - Returns a redirect to the home page if login is successful,
 * or an object with an error message if login fails. In case of an error, returns a Response with
 * status 401.
 *
 * @throws {Error} - Logs and rethrows any errors encountered during the login process.
 */
export const loginAction = async ({ request }: { request: Request }) => {
  try {
    console.log("loginAction");
    const formData = await request.formData();
    const formFields = Object.fromEntries(formData);
    console.log(formFields.username, formFields.password);

    if (formFields.username === "admin" && formFields.password === "admin") {
      localStorage.setItem("token", "admin");
      return replace("/");
    } else {
      return {
        message: "Invalid username or password",
      };
    }
  } catch (error) {
    console.error(error);
    return new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });
  }
};
