import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Wrap,
  Text,
  WrapItem,
  IconButton,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AddTagsPopover } from "../components/AddTagsPopover";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { Pagination } from "../components/Pagination";
import { Post } from "../components/Post";
import { TagButton } from "../components/TagButton";
import { Tag } from "../components/Tag";
import {
  TagFragment,
  useGetPublishedPostsQuery,
  useGetTagsQuery,
} from "../generated/graphql";
import { useIsAdminPage } from "../utils/useIsAdminPage";
import { LoadingScreen } from "../components/LoadingScreen";

const Posts: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [{ data: tags }] = useGetTagsQuery();
  const [{ data, fetching, error }, fetchPosts] = useGetPublishedPostsQuery({
    variables: {
      page: page,
      limit: 10,
      tagIds: tagIds,
    },
  });

  useEffect(() => {
    setPage(
      router.query.page && typeof router.query.page == "string"
        ? parseInt(router.query.page)
        : 0
    );
  }, [router.query.page]);

  useEffect(() => {
    const tagIdsArray =
      typeof router.query.tagIds == "string"
        ? [router.query.tagIds]
        : router.query.tagIds;
    if (router.isReady) {
      setTagIds(tagIdsArray || []);
    }
  }, [router.query.tagIds]);

  if (!data?.getPublishedPosts.posts || !router.isReady) {
    return <LoadingScreen />;
  }

  const handlePaginationChange = (value: number) => {
    setPage(value);
    router.push(
      {
        query: {
          ...router.query,
          page: value,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleTagschange = (tags: string[]) => {
    setTagIds(tags);
    router.push(
      {
        query: {
          tagIds: tags,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <Layout>
      <Stack>
        <Card alignItems="center" justifyContent="center">
          <Flex justifyContent="space-between" alignItems="center">
            <Wrap align="center">
              <WrapItem>
                <Heading size={"md"} pr={4} color="#ddd">
                  Zobraziť tagy:{" "}
                </Heading>
              </WrapItem>
              {tags?.getTags
                .filter((item) => tagIds.includes(item.id))
                .map((tag, index) => (
                  <WrapItem key={index}>
                    <Tag
                      tag={tag}
                      onRemove={() => {
                        handleTagschange(
                          tagIds.filter((item) => item !== tag.id)
                        );
                      }}
                    />
                  </WrapItem>
                ))}
            </Wrap>
            <AddTagsPopover
              selectedTags={
                tags?.getTags.filter((item) => tagIds.includes(item.id)) || []
              }
              setSelectedTags={(tags) => {
                handleTagschange(tags.map((item) => item.id));
              }}
            >
              <IconButton aria-label="add tags to filter" icon={<AddIcon />} />
            </AddTagsPopover>
          </Flex>
        </Card>
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
