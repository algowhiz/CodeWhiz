import React from 'react';
import { Box, Flex, Heading, Spacer, Link, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";


const Header = () => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.300', 'gray.700');
  const color = useColorModeValue('black', 'white');

  return (
    <Box bg={bg} px={4} py={2} shadow="md">
      <Flex alignItems="center">
        <Heading size="md" color={color}>
          CodeWhiz
        </Heading>
        <Spacer />
        <Flex alignItems="center">
          <Button onClick={toggleColorMode} ml={4}>
            {color == "black" ? <CiDark size={30} /> : <CiLight size={30} /> } 
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
