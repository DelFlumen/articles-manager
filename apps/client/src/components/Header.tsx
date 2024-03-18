import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';

const MenuItem = ({
  children,
  to = '/',
  isLast,
}: {
  children: string;
  to?: string;
  isLast?: boolean;
}) => {
  return (
    <Box ml={isLast ? 'auto' : ''} borderBottom="1px solid gray">
      <Link to={to}>
        <Text display="block">{children}</Text>
      </Link>
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
      <MenuItem to="add">Create New Article</MenuItem>
      <MenuItem to="login" isLast>
        Log In
      </MenuItem>
    </Flex>
  );
};

export default Header;
