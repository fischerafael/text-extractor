import React from "react";
import * as C from "@chakra-ui/react";

interface ButtonProps extends C.ButtonProps {
  children: React.ReactNode;
}

const color = "blue.500";

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <C.Button
      colorScheme={color}
      bgGradient={`linear(to-r, ${color}, ${color})`}
      fontSize="sm"
      size={"sm"}
      fontWeight="semi-bold"
      {...props}
    >
      {children}
    </C.Button>
  );
};
