import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Header from './component/Header';
import CodeEditor from './component/CodeEditor';

const App = () => {
  const bg = useColorModeValue('gray.100', '#0f0a18');
  const color = useColorModeValue('black', 'white');

  return (
    <div>
      <Header />
      <Box minH="100vh" bg={bg} color={color} px={6} py={8}>
        <CodeEditor />
      </Box>
    </div>
  );
};

export default App;
