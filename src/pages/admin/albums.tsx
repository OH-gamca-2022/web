import { DeleteIcon } from "@chakra-ui/icons";
import {
  Wrap,
  WrapItem,
  Text,
  Image,
  Box,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Layout } from "../../components/Layout";
import {
  useDeleteAlbumMutation,
  useGetGoogleAlbumsQuery,
  useSaveAlbumMutation,
} from "../../generated/graphql";
import { useIsAdminPage } from "../../utils/useIsAdminPage";

const AdminAlbums: NextPage = () => {
  useIsAdminPage();
  const [{ data }] = useGetGoogleAlbumsQuery();
  const [, saveAlbum] = useSaveAlbumMutation();
  const [, deleteAlbum] = useDeleteAlbumMutation();
  console.log(data);
  return (
    <Layout>
      <Wrap spacing={4}>
        {data?.getGoogleAlbums.map((item, index) => (
          <WrapItem>
            <Box>
              <Image
                src={item.googleAlbum.coverPhotoBaseUrl}
                alt={item.googleAlbum.title}
                height={150}
                mb={2}
                borderRadius={10}
                overflow="hidden"
              />
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">{item.googleAlbum.title}</Text>
                <Button
                  size="sm"
                  onClick={() => {
                    if (item.savedAlbum) {
                      deleteAlbum({ id: item.savedAlbum.id });
                    } else {
                      saveAlbum({ id: item.googleAlbum.id });
                    }
                  }}
                  colorScheme={item.savedAlbum ? undefined : "blue"}
                >
                  {item.savedAlbum ? "Vymazať" : "Pridať"}
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
