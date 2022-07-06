import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout";

import { PostForm } from "../../../components/PostForm";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <PostForm id={id as string} />
    </Layout>
  );
};

export default Post;
