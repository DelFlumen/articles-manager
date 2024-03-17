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
} from '@chakra-ui/react';

export type ArticleInfo = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorName: string;
};

const Article = ({ articleInfo }: { articleInfo: ArticleInfo }) => {
  const { id, title, content, createdAt, authorName } = articleInfo;
  console.log({ createdAt });
  console.log(typeof createdAt);

  // return (
  //   <Tr key={id}>
  //     <Td>{title}</Td>
  //     <Td>
  {
    new Date(createdAt).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  //     </Td>
  //     <Td>{authorName}</Td>
  //   </Tr>
  // );

  return (
    <Card key={id} minW="80%">
      <CardBody>
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <Stack ml="5" spacing="3">
          <Text>{content}</Text>
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
      <CardFooter justify="flex-end">
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="gray">
            Edit
          </Button>
          <Button variant="ghost" colorScheme="red">
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Article;
