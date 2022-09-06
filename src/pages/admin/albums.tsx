import {
  Wrap,
  WrapItem,
  Text,
  Image,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Layout } from "../../components/Layout";
import {
  useGetGoogleAlbumsQuery,
  useSaveAlbumMutation,
} from "../../generated/graphql";

const AdminAlbums: NextPage = () => {
  const [{ data }] = useGetGoogleAlbumsQuery();
  const [, saveAlbum] = useSaveAlbumMutation();
  return (
    <Layout>
      <Wrap spacing={4}>
        {data?.getGoogleAlbums.map((item, index) => (
          <WrapItem>
            <Box>
              <Image
                src={item.coverPhotoBaseUrl}
                alt={item.title}
                height={150}
                mb={2}
                borderRadius={10}
                overflow="hidden"
              />
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">{item.title}</Text>
                <Button
                  size="sm"
                  onClick={() => {
                    saveAlbum({ id: item.id });
                  }}
                >
                  Pridať
                </Button>
              </Flex>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Layout>
  );
};

export default AdminAlbums;
