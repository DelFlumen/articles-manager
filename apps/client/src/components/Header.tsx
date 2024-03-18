import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

const MenuItem = ({
  children,
  to = '/',
  isAdd,
  onClick,
}: {
  children: string;
  to?: string;
  isAdd?: boolean;
  onClick?: () => void;
}) => {
  const isActive = useMatch(to);

  return (
    <Box
      mr={isAdd ? 'auto' : ''}
      borderBottom={isActive ? '2px solid gray' : ''}
      onClick={onClick}
    >
      <NavLink to={to} style={{ textDecoration: 'none' }}>
        <Text display="block">{children}</Text>
      </NavLink>
    </Box>
  );
};

const Header: React.FC = () => {
  const { isAdmin, user, logout } = useAuth();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      gap={5}
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      borderBottom="1px solid black"
      color={['primary.700', 'primary.700', 'primary.300', 'primary.300']}
    >
      <MenuItem>Gallery</MenuItem>
      {isAdmin && (
        <MenuItem to="add" isAdd>
          Create New Article
        </MenuItem>
      )}
      {!user ? (
        <MenuItem to="login">Log In</MenuItem>
      ) : (
        <MenuItem onClick={logout}>Log Out</MenuItem>
      )}
    </Flex>
  );
};

export default Header;
