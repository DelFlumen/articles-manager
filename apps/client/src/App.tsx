import React, { useState } from 'react';
import {
  ChakraProvider,
  Tabs,
  TabIndicator,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Center,
  // useToast,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddEditArticle from './components/AddEditArticle';
import LoginModal from './components/LoginModal';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = new QueryClient();

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Container minWidth="100vw">
          <Tabs variant="unstyled">
            <Center>
              <TabList>
                <Tab>Articles</Tab>
                <Tab>Create Article</Tab>
                <Tab onClick={handleLogin}>Log In</Tab>
              </TabList>
            </Center>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <Gallery />
              </TabPanel>
              <TabPanel>
                <AddEditArticle />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
