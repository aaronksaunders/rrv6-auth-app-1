import { Link, useLoaderData } from "react-router-dom";

function PostDetail() {
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  const data = useLoaderData() as { message: string; post: Post };
  return (
    <>
      <h1>Post Detail</h1>
      {data?.post && (
        <div>
          <h3>{data.message}</h3>
          <h3>{data.post.title}</h3>
          <p>{data.post.body}</p>
          <Link to="/">Back to Home</Link>
        </div>
      )}
    </>
  );
}

export default PostDetail;
