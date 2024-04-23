import React, { useState } from "react";
import * as C from "@chakra-ui/react";
import { Button } from "@/client/components/Button";
import { InputDropzone } from "@/client/components/InputDropzone";

interface State {
  file: null | File;
  isLoading: boolean;
  text: string;
}

const extractService = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const url = "/api/extract-text-from-pdf";
  const options = {
    method: "POST",
    body: formData,
  };

  const res = await fetch(url, options);
  const data = await res.json();
  const text = data.result.text;
  return text;
};

export const PagePublicExtract = () => {
  const [state, setState] = useState<State>({
    file: null,
    isLoading: false,
    text: "",
  });

  const onRemoveFile = () => {
    setState((prev) => ({ ...prev, file: null }));
  };

  const onDrop = (files: File[]) => {
    setState((prev) => ({ ...prev, file: files[0] }));
  };

  const extract = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const res = await extractService(state.file!);
      setState((prev) => ({ ...prev, text: res, file: null }));
    } catch (e: any) {
      console.log("[e]", e.message);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const onCleanText = () => {
    setState((prev) => ({ ...prev, text: "" }));
  };

  const onCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied");
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

        {!!state.file && (
          <Button
            isLoading={state.isLoading}
            alignSelf="flex-end"
            onClick={extract}
          >
            Extract Text
          </Button>
        )}

        {!!state.text && (
          <C.VStack w="full">
            <C.HStack w="full" justify="space-between">
              <Button onClick={() => onCopyToClipboard(state.text)}>
                Copy Text
              </Button>
              <Button onClick={onCleanText}>Clean Text</Button>
            </C.HStack>
            <C.Text>{state.text}</C.Text>
            <C.HStack w="full" justify="space-between">
              <Button onClick={() => onCopyToClipboard(state.text)}>
                Copy Text
              </Button>
              <Button onClick={onCleanText}>Clean Text</Button>
            </C.HStack>
          </C.VStack>
        )}
      </C.VStack>
    </C.VStack>
  );
};
