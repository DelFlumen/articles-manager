import { Formik, Form, Field } from 'formik';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type FormValues = {
  title: string;
  content: string;
};

const fetchArticle = async (id: string) => {
  const response = await fetch(`/api/articles/${id}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const AddEditArticle: React.FC = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const toast = useToast();

  const { data, isLoading, isError } = useQuery(
    ['article', articleId],
    () => {
      if (articleId) return fetchArticle(articleId);
    },
    {
      enabled: !!articleId, // Enable only when articleId exists
    },
  );

  const handleSubmit = async (values: { title: string; content: string }) => {
    try {
      const requestOptions = {
        method: articleId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values, authorId: 2 }),
      };

      const url = articleId ? `/api/articles/${articleId}` : `/api/articles`;

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to save article.');
      }
    } catch (error) {
      throw new Error('Failed to save article.');
    }
  };

  const mutation = useMutation(handleSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries('article');
      queryClient.invalidateQueries('articles');
      toast({
        title: 'Article saved successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
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
    <Flex justifyContent="center">
      <Box minW="70%">
        {isError && <span>Error fetching data</span>}
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <Formik<FormValues>
            initialValues={{
              title: data?.title || '',
              content: data?.content || '',
            }}
            onSubmit={(values) => {
              mutation.mutate(values);
            }}
          >
            <Form>
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Field as={Input} name="title" id="title" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Field as={Textarea} name="content" id="content" />
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={mutation.isLoading}
                type="submit"
              >
                Save
              </Button>
            </Form>
          </Formik>
        )}
      </Box>
    </Flex>
  );
};

export default AddEditArticle;
