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
import { useMutation, useQueryClient } from 'react-query';
import { ArticleInfo } from './Article';

type FormValues = {
  title: string;
  content: string;
};

const AddEditArticle = ({
  articleInfo,
}: {
  articleInfo?: Omit<ArticleInfo, 'createdAt' | 'authorName'>;
}) => {
  const { id, title, content } = articleInfo ?? {};

  const handleSubmit = async (values: { title: string; content: string }) => {
    try {
      const requestOptions = {
        method: articleInfo ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };

      const url = `/api/articles/${id}`;

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to save article.');
      }
    } catch (error) {
      throw new Error('Failed to save article.');
    }
  };

  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation(handleSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      toast({
        title: 'Article saved successfully.',
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
    <Flex justifyContent="center">
      <Box minW="70%">
        <Formik<FormValues>
          initialValues={{ title: title || '', content: content || '' }}
          onSubmit={(values, { resetForm }) => {
            mutation.mutate(values);
            resetForm();
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
      </Box>
    </Flex>
  );
};

export default AddEditArticle;
