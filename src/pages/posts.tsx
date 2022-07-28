import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Pagination } from "../components/Pagination";
import { Post } from "../components/Post";
import { useGetPublishedPostsQuery } from "../generated/graphql";

const Posts: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [{ data, fetching, error }, fetchPosts] = useGetPublishedPostsQuery({
    variables: {
      page: page,
      limit: 3,
      tagIds: tagIds,
    },
  });

  useEffect(() => {
    setPage(
      router.query.page && typeof router.query.page == "string"
        ? parseInt(router.query.page)
        : 0
    );
    setTagIds(router.query.tagIds as string[]);
  }, [router.query.page, router.query.tagIds]);

  if (!data?.getPublishedPosts.posts) {
    return <Heading>Loading...</Heading>;
  }

  const handlePaginationChange = (value: number) => {
    setPage(value);
    router.push(`/?page=${value}`, undefined, { shallow: true });
  };

  return (
    <Layout>
      <Stack>
        {data?.getPublishedPosts.posts.map((item, index) => (
          <Post post={item} key={index} />
        ))}
        <Flex justifyContent="center">
          <Pagination
            count={data.getPublishedPosts.numOfPages}
            page={page}
            onChange={handlePaginationChange}
          />
        </Flex>
      </Stack>
    </Layout>
  );
};

export default Posts;
