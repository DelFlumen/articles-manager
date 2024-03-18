import React from 'react';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  Flex,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: { email: string; password: string },
    actions: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => {
    try {
      login(values);
      actions.resetForm();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    } finally {
      // Set submitting state to false
      actions.setSubmitting(false);
    }
  };
  return (
    <Flex justifyContent="center">
      <Box minW="20rem">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
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
