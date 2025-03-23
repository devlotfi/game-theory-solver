import { faPenAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Players } from "../types/players";
import { useContext } from "react";
import { SolverContext } from "../context/solver-context";
import { useFormik } from "formik";
import * as yup from "yup";
import { ValidatedInput } from "./validated-input";

interface Props {
  player: Players;
}

export default function EditPlayerNameBtn({ player }: Props) {
  const { player1Name, player2Name, setPlayer1Name, setPlayer2Name } =
    useContext(SolverContext);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      playerName: player === Players.PLAYER_1 ? player1Name : player2Name,
    },
    validationSchema: yup.object({
      playerName: yup.string().min(1).max(64).required(),
    }),
    onSubmit(values) {
      if (player === Players.PLAYER_1) {
        setPlayer1Name(values.playerName);
      } else if (player === Players.PLAYER_2) {
        setPlayer2Name(values.playerName);
      }
      onClose();
    },
  });

  return (
    <>
      <Button
        isIconOnly
        variant="bordered"
        size="sm"
        className="hidden group-hover:flex"
        onPress={onOpen}
      >
        <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit player name (
                {player === Players.PLAYER_1 ? player1Name : player2Name})
              </ModalHeader>
              <ModalBody className="p-[1.5rem]">
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-[1rem]"
                >
                  <ValidatedInput
                    name="playerName"
                    placeholder="Player name"
                    label="Player name"
                    formik={formik}
                  ></ValidatedInput>

                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    className="border-divider"
                    startContent={
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    }
                  >
                    Edit player name
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
