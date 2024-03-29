import React from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddEditArticle from './components/AddEditArticle';
import Login from './components/Login';
import Gallery from './components/Gallery';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAdmin, user } = useAuth();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Container minWidth="100%" px={8} margin="auto">
            <Header />
            <Routes>
              <Route path="/" element={<Gallery />} />
              {isAdmin && (
                <>
                  <Route path="/add" element={<AddEditArticle />} />
                  <Route path="/edit/:articleId" element={<AddEditArticle />} />
                </>
              )}
              {!user && <Route path="/login" element={<Login />} />}
            </Routes>
          </Container>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
