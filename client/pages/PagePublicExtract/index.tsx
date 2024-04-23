import React, { useState } from "react";
import * as C from "@chakra-ui/react";
import { Button } from "@/client/components/Button";
import { InputDropzone } from "@/client/components/InputDropzone";

interface State {
  file: null | File;
}

export const PagePublicExtract = () => {
  const [state, setState] = useState<State>({
    file: null,
  });

  const onRemoveFile = () => {
    setState((prev) => ({ ...prev, file: null }));
  };

  const onDrop = (files: File[]) => {
    setState((prev) => ({ ...prev, file: files[0] }));
  };

  return (
    <C.VStack w="full" align="center" p="8">
      <C.VStack maxW={"1000px"} w="full" spacing="8">
        <C.HStack w="full" justify="space-between" gap="4">
          <C.Text>Select PDF</C.Text>
        </C.HStack>

        {!state.file && <InputDropzone onDrop={onDrop} />}

        {!!state.file && (
          <C.HStack
            w="full"
            bg="white"
            justify="space-between"
            p="8"
            border="1px"
            borderColor="gray.300"
          >
            <C.Text>{state.file.name}</C.Text>
            <Button onClick={onRemoveFile}>Remove</Button>
          </C.HStack>
        )}

        {!!state.file && <Button alignSelf="flex-end">Extract Text</Button>}
      </C.VStack>
    </C.VStack>
  );
};
