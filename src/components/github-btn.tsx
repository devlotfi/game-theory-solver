import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link } from "@heroui/react";

export default function GithubBtn() {
  return (
    <Button
      variant="bordered"
      isIconOnly
      as={Link}
      className="bg-content2 border-divider text-[15pt]"
      href="https://github.com/devlotfi/game-theory-solver"
      target="_blank"
    >
      <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
    </Button>
  );
}
