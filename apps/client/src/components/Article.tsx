import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export type ArticleInfo = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorName: string;
};

const deleteArticle = async (articleId: number, token: string) => {
  try {
    const response = await fetch(`/api/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete article.');
    }
  } catch (error) {
    throw new Error('Failed to delete article.');
  }
};

const Article = ({ articleInfo }: { articleInfo: ArticleInfo }) => {
  const { id, title, content, createdAt, authorName } = articleInfo;
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isAdmin, token } = useAuth();

  const mutation = useMutation(() => deleteArticle(id, token), {
    onSuccess: () => {
      // Invalidate the query after deletion to refetch the updated list of articles
      queryClient.invalidateQueries('articles');
      toast({
        title: 'Article deleted successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      if (error instanceof Error && error.message) {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Card key={id} minW="80%" maxW="80%" minH="20rem" maxH="20rem">
      <CardBody
        as="div"
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <Flex direction="column" ml="5" gap="3">
          <Flex
            shrink={2}
            direction="column"
            justify="space-between"
            height="10rem"
          >
            <Box maxH="5rem" overflow="hidden">
              <Text
                as="div"
                css={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {content}
              </Text>
            </Box>
            <Box ml="auto" mt="auto">
              <Text color="gray.700" size="sm">
                author: {authorName}
              </Text>
              <Text color="gray.400">
                {' '}
                {new Date(createdAt).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardBody>
      <Divider />
      {isAdmin ? (
        <CardFooter justify="flex-end" alignItems="center" minH={15}>
          <ButtonGroup spacing="2">
            <Link to={`edit/${id}`}>
              <Button variant="solid" colorScheme="gray">
                Edit
              </Button>
            </Link>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => mutation.mutate()}
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default Article;
