import { Button, useColorMode } from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";

const ThemeButton = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <header>
      <Button h="50px" w="50px" bg={"transparent"} top={0} right={0}>
        <MdDarkMode onClick={toggleColorMode} size="4x" />
      </Button>
    </header>
  );
};

export default ThemeButton;