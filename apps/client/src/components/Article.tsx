import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export type ArticleInfo = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorName: string;
};

const Article = ({ articleInfo }: { articleInfo: ArticleInfo }) => {
  const { id, title, content, createdAt, authorName } = articleInfo;

  return (
    <Card key={id} minW="80%" maxW="80%" minH="20rem" maxH="20rem">
      <CardBody>
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <Stack ml="5" spacing="3">
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
          <Text color="gray.700" size="sm" ml="auto">
            {authorName}
          </Text>
          <Text color="gray.400" ml="auto">
            {' '}
            {new Date(createdAt).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justify="flex-end" minH={15}>
        <ButtonGroup spacing="2">
          <Link to={`edit/${id}`}>
            <Button variant="solid" colorScheme="gray">
              Edit
            </Button>
          </Link>
          <Button variant="ghost" colorScheme="red">
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Article;
