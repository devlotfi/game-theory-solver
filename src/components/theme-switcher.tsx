import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import { ThemeOptions } from "../types/theme-options";
import { Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeSwitcher() {
  const { themeOption, setTheme } = useContext(ThemeContext);

  const switchTheme = () => {
    switch (themeOption) {
      case ThemeOptions.LIGHT:
        setTheme(ThemeOptions.DARK);
        break;
      case ThemeOptions.DARK:
        setTheme(ThemeOptions.SYSTEM);
        break;
      case ThemeOptions.SYSTEM:
        setTheme(ThemeOptions.LIGHT);
        break;
    }
  };

  return (
    <Button
      isIconOnly
      variant="bordered"
      className="bg-background border border-divider"
      onPress={switchTheme}
    >
      {themeOption === ThemeOptions.LIGHT ? (
        <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
      ) : themeOption === ThemeOptions.DARK ? (
        <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={faComputer}></FontAwesomeIcon>
      )}
    </Button>
  );
}
