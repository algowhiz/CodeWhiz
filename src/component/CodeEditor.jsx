import { Box, HStack, Button, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { code_Snippets, Vlang } from '../utils/codeSnippets';
import axios from 'axios';
import Output from './Output';

function CodeEditor() {
    const editorRef = useRef();
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [showOutput, setShowOutput] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [output, setOutput] = useState('');
    const [redColor, setRedColor] = useState(false);
    const bg = useColorModeValue('gray.100', '#0f0a18');
    const color = useColorModeValue('black', 'white');
    const editorTheme = useColorModeValue('light', 'vs-dark');
    

    const onMount = (e) => {
        editorRef.current = e;
        e.focus();
    };

    const onSelect = (lang) => {
        setLanguage(lang);
        setValue(code_Snippets[lang]);
    };

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const api = axios.create({
        baseURL: "https://emkc.org/api/v2/piston",
    });

    const handelRun = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        try {
            setShowOutput(true);
            const resp = await api.post('/execute', {
                language: language,
                version: Vlang[language],
                files: [
                    {
                        content: sourceCode,
                    }
                ],
            });
            if (resp.data.run) {
                if(resp.data.run.stderr!=''){
                    setRedColor(true);
                }else{
                    setRedColor(false)
                }
                setOutput(resp.data.run.output);
            } else {
                setRedColor(true);
                setOutput('Error: No output received');
            }
        } catch (error) {
            setRedColor(true)
            if (error.response) {
                
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error setting up the request:', error.message);
            }
            setOutput('Error: Failed to run code. Try again ...');
        }
    };

    return (
        <Box bg={bg} color={color}>
            {isMobile ? (
                <Box>
                    {!showOutput && (
                        <Box>
                            <LanguageSelector language={language} onSelect={onSelect} />
                            <Editor
                                theme={editorTheme}
                                height="calc(100vh - 20vh)"
                                language={language}
                                defaultValue={code_Snippets[language]}
                                value={value}
                                onMount={onMount}
                                onChange={onChange}
                            />
                            <Button mt={4} colorScheme="teal" onClick={handelRun}>
                                Run
                            </Button>
                        </Box>
                    )}
                    {showOutput && (
                        <Box>
                            <Output redColor={redColor} output={output} handelRun={handelRun} setShowOutput={setShowOutput} />
                        </Box>
                    )}
                </Box>
            ) : (
                <HStack>
                    <Box w='50%' >
                        <LanguageSelector language={language} onSelect={onSelect} />
                        <Editor
                            theme={editorTheme}
                            height="80vh"
                            language={language}
                            defaultValue={code_Snippets[language]}
                            value={value}
                            onMount={onMount}
                            onChange={onChange}
                        />
                    </Box>
                    <Box w='50%'>
                        <Output redColor={redColor} output={output} handelRun={handelRun} setShowOutput={setShowOutput} />
                    </Box>
                </HStack>
            )}
        </Box>
    );
}

export default CodeEditor;
