import { Button, Flex, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { zipText } from "../functions/zipText";

export default function ZipPage() {
    const [text, setText] = useState("");
    const [file, setFile] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setFile(result);
            };
            reader.readAsText(uploadedFile);
        }
    };

    const clearFileInput = () => {
        setFile("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleZip = () => {
        if (!file && !text) {
            toast({
                title: "Warning!",
                description: "Please enter text or upload a file before zipping.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        zipText(file || text);
    };

    return (
        <Flex h="70vh" w="50%" borderRadius="md" justify="center" align="center" direction="column" bg="black" color="white" p={6} boxShadow="lg">
            <Text fontSize="3xl" fontWeight="bold">Zip Text</Text>

            <VStack spacing={4} w="100%" mt={6}>
                <Text fontSize="xl" textAlign="center">Enter the text to zip or upload a .txt file</Text>
                <Input
                    w="80%"
                    placeholder="Enter text here..."
                    bg="white"
                    color="black"
                    borderRadius="md"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Input type="file" ref={fileInputRef} accept=".txt" onChange={handleFileUpload} w="80%" bg="white" color="black" borderRadius="md" p={1} />
                <Button w="50%" colorScheme="red" onClick={clearFileInput}>
                    Clear File
                </Button>
            </VStack>

            <Button
                mt={6}
                colorScheme="green"
                onClick={handleZip}
            >
                Zip
            </Button>
        </Flex>
    );
}
