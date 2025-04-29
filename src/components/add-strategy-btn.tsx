import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { SolverUtils } from "../solver-utils";

interface Props {
  player: Players;
}

export default function AddStrategyBtn({ player }: Props) {
  const { solverState, setSolverState } = useContext(SolverContext);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      strategyName: "",
    },
    validationSchema: yup.object({
      strategyName: yup.string().min(1).max(64).required(),
    }),
    onSubmit(values, formikHelpers) {
      setSolverState(
        SolverUtils.addStrategy(solverState, player, values.strategyName)
      );
      formikHelpers.resetForm();
      onClose();
    },
  });

  return (
    <>
      <Button
        isIconOnly
        isDisabled={solverState.action !== null}
        color="primary"
        variant="light"
        onPress={onOpen}
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="text-[18pt]"
        ></FontAwesomeIcon>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add strategy (
                {player === Players.PLAYER_1
                  ? solverState.player1Name
                  : solverState.player2Name}
                )
              </ModalHeader>
              <ModalBody className="p-[1.5rem]">
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-[1rem]"
                >
                  <ValidatedInput
                    name="strategyName"
                    placeholder="Strategy name"
                    label="Strategy name"
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
                    Add strategy
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
