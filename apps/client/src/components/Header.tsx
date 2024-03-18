import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';

const MenuItem = ({
  children,
  to = '/',
  isAdd,
}: {
  children: string;
  to?: string;
  isAdd?: boolean;
}) => {
  const isActive = useMatch(to);

  return (
    <Box
      mr={isAdd ? 'auto' : ''}
      borderBottom={isActive ? '2px solid gray' : ''}
    >
      <NavLink to={to} style={{ textDecoration: 'none' }}>
        <Text display="block">{children}</Text>
      </NavLink>
    </Box>
  );
};

const Header: React.FC = () => {
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
      <MenuItem to="add" isAdd>
        Create New Article
      </MenuItem>
      <MenuItem to="login">Log In</MenuItem>
    </Flex>
  );
};

export default Header;
