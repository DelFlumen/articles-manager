import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, actions) => {
              // Handle form submission
              console.log(values);
              actions.setSubmitting(false);
              onClose();
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
