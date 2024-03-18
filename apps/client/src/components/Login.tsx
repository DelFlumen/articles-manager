import React from 'react';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  Flex,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';

const Login: React.FC = () => {
  return (
    <Flex justifyContent="center">
      <Box minW="20rem">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            // Handle form submission
            console.log(values);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" />
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

export default Login;
