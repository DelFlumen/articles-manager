import React from 'react';
import {
  ChakraProvider,
  Container,
  // useToast,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddEditArticle from './components/AddEditArticle';
import LoginModal from './components/LoginModal';
import Gallery from './components/Gallery';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          {/* <Flex justify="center" width="100%" height="100%"> */}
          <Container minWidth="100%" px={8} margin="auto">
            {/* <Container p={0} maxWidth="unset"> */}
            <Header />
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/add" element={<AddEditArticle />} />
              <Route path="/login" element={<LoginModal />} />
            </Routes>
          </Container>
          {/* </Flex> */}
        </Router>
        {/* <Container minWidth="100vw">
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
        </Container> */}
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
