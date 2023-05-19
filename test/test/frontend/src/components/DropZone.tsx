import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "./Box";
import Button from "./buttons/Button";
import Divider from "./Divider";
import Typography, { H5, Small } from "./Typography";

export interface DropZoneProps {
  onChange?: (files: []) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setSelectedFile(acceptedFiles[0]);
      if (onChange) {
        onChange(acceptedFiles);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: ".jpeg,.jpg,.png,.gif,.pdf,.docx",
    maxFiles: 1,
  });

  const discardFile = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        border="1px dashed"
        borderColor="gray.400"
        borderRadius="10px"
        bg={isDragActive && "gray.200"}
        transition="all 250ms ease-in-out"
        style={{ outline: "none" }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box textAlign="center">
          <H5 mb="18px" color="text.muted">
            Drag &amp; drop file here
          </H5>

          <Divider width="200px" mx="auto" />
          <Box display="flex" justifyContent="center">
            <Button color="primary" bg="primary.light" px="2rem" type="button">
              Select file
            </Button>
          </Box>
          <Small color="text.muted">Supported file types: jpeg, jpg, png, gif, pdf, docx</Small>
        </Box>
      </Box>
      {selectedFile && (
        <Box mt={2} display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6" color="text.primary">
              Uploaded File: <a href={URL.createObjectURL(selectedFile)} target="_blank" rel="noreferrer">{selectedFile.name}</a>
            </Typography>
          </Box>
          <Button color="secondary" bg="secondary.light" px="2rem" ml="auto" onClick={discardFile}>
            Discard
          </Button>
        </Box>
      )}
    </>
  );
};

export default DropZone;
