import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout";

import { PostForm } from "../../../components/PostForm";
import { useIsAdminPage } from "../../../utils/useIsAdminPage";

const Post = () => {
  useIsAdminPage();
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <Heading>Clanok nebol najdeny</Heading>;
  }

  return (
    <Layout>
      <PostForm id={id as string} />
    </Layout>
  );
};

export default Post;
