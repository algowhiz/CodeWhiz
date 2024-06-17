import { Box, Text, Button, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axios from 'axios';

const Output = ({ handelRun, output, setShowOutput, redColor }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const bg = useColorModeValue('gray.100', '#0f0a18');
    const color = useColorModeValue('black', 'white');

    const handleBack = () => {
        setShowOutput(false);
    };


    return (
        <Box mt={3} bg={bg} color={color}>
            <Text mb={2} fontWeight="700" fontSize="lg">Output</Text>
            {!isMobile ? (
                <Button mb={2} variant="outline" colorScheme="green" fontWeight="500" onClick={handelRun}>
                    Run Code
                </Button>
            ) : (
                <Button mb={2} variant="outline" colorScheme="green" fontWeight="500" onClick={handleBack}>
                    Back
                </Button>
            )}
            <Box h="80vh" p={2} mt={2} borderRadius={4} borderColor="gray" border="1px solid">
                <Text fontWeight={600} color={redColor ? 'red' : `${bg =='#0f0a18' ? 'white': 'black'}`}>{output ? output : "Hit RUN to see OUTPUT"}</Text>
            </Box>
        </Box>
    );
};

export default Output;
