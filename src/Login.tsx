import { Form, useActionData } from "react-router-dom";

/**
 * Login component renders a login form with fields for username and password.
 * It also displays a message if provided by the `useActionData` hook.
 *
 * @returns {JSX.Element} The rendered login form component.
 */
function Login() {
  const data = useActionData() as { message: string };
  console.log(data);

  return (
    <>
      <h1>LOGIN PAGE</h1>
      {data?.message && <h3>{data.message}</h3>}
      <div>
        <Form method="POST">
          <input type="text" name="username" placeholder="username" />
          <br />
          <input type="password" name="password" placeholder="password" />
          <br />
          <button type="submit">Login</button>
        </Form>
      </div>
    </>
  );
}

export default Login;
