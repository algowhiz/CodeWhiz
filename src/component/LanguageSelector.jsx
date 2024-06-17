import { Box, Text, Menu, MenuButton, MenuList, MenuItem, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const lang = [
    ["javascript", "1.32.3"],
    ["typescript", "1.32.3"],
    ["python", "3.9.2"],
    ["java", "15.0.2"],
    ["php", "8.2.3"],
    ["c", "10.2.0"],
    ["cpp", "10.2.0"],
    ["swift", "5.3.3"],
];

const LanguageSelector = ({ language, onSelect }) => {
    const bg = useColorModeValue('gray.100', '#0f0a18');
    const color = useColorModeValue('black', 'white');

    return (
        <Box bg={bg} p={4} borderRadius="md" color={color}>
            <Text mb={3} fontSize="lg" fontWeight='700'>Language:</Text>
            <Menu>
                <MenuButton fontWeight='700' p={3} rounded="md" bg={bg} color={color} _hover={{ bg: bg }} _expanded={{ bg: bg }}>
                    {language}
                </MenuButton>
                <MenuList bg={bg} borderColor={color}>
                    {lang.map(([lang, ver]) => (
                        <MenuItem
                            onClick={() => onSelect(lang)}
                            value={lang}
                            className='flex'
                            key={lang}
                            bg={bg}
                            color={color}
                            _hover={{ bg: bg }}
                        >
                            <Text>{lang} : </Text>
                            <Text>{ver}</Text>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
}

export default LanguageSelector;
