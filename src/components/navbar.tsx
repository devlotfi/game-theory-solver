import LogoSVG from "../assets/logo.svg";
import ThemeSwitcher from "./theme-switcher";
import GithubBtn from "./github-btn";

export default function Navbar() {
  return (
    <div className="flex h-[4rem] bg-content1 border-b border-divider justify-between items-center px-[1rem]">
      <div className="flex items-center gap-[1rem]">
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
