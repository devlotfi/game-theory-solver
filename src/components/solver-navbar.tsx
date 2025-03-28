import { useContext } from "react";
import LogoSVG from "../assets/logo.svg";
import ThemeSwitcher from "./theme-switcher";
import { Button, cn } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { SolverContext } from "../context/solver-context";
import GithubBtn from "./github-btn";

export default function SolverNavbar() {
  const { sidebarOpen, setSidebarOpen } = useContext(SolverContext);

  return (
    <div className="flex h-[4rem] bg-content1 border-b border-divider justify-between items-center px-[1rem]">
      <div className="flex items-center gap-[1rem]">
        <Button
          isIconOnly
          variant="bordered"
          className="bg-background border border-divider"
          onPress={() => setSidebarOpen(!sidebarOpen)}
        >
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            className={cn("duration-300", sidebarOpen && "rotate-180")}
          ></FontAwesomeIcon>
        </Button>
        <img src={LogoSVG} alt="logo" className="h-[2.3rem]" />
        <div className="hidden sm:flex font-bold text-[15pt] font-['Fugaz_One']">
          Game Theory Solver
        </div>
      </div>

      <div className="flex gap-[0.5rem]">
        <GithubBtn></GithubBtn>
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </div>
  );
}
