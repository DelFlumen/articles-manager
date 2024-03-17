import { Formik, Form, Field, FieldProps } from 'formik';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  Box,
} from '@chakra-ui/react';

const AddEditArticle = () => {
  return (
    <Flex justifyContent="center">
      <Box minW="70%">
        <Formik
          initialValues={{ title: '', content: '' }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            if (!values.content) {
              errors.content = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            // Handle form submission
            console.log(values);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="title">
                {({ field }: FieldProps) => (
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="content">
                {({ field }: FieldProps) => (
                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <Textarea {...field} />
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default AddEditArticle;
