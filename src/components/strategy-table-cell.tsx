import {
  Button,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@heroui/react";
import { useContext, useState } from "react";
import { SolverContext } from "../context/solver-context";
import { Strategy } from "../types/strategy";
import { Players } from "../types/players";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ValidatedInput } from "../components/validated-input";
import { useFormik } from "formik";
import * as yup from "yup";

interface StrategyTableCellProps {
  strategy: Strategy;
  player: Players;
}

export default function StrategyTableCell({
  player,
  strategy,
}: StrategyTableCellProps) {
  const [open, setOpen] = useState<boolean>(false);
  const {
    removeStrategy,
    editStrategy,
    highlightedPlayer1Strategies,
    highlightedPlayer2Strategies,
  } = useContext(SolverContext);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      strategyName: strategy.name,
    },
    validationSchema: yup.object({
      strategyName: yup.string().min(1).max(64).required(),
    }),
    onSubmit(values) {
      editStrategy(player, strategy.id, values.strategyName);
      onCloseEdit();
    },
  });

  return (
    <>
      <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete strategy ({strategy.name})
              </ModalHeader>
              <ModalBody className="p-[1.5rem]">
                <p>Are you sure you want to delete this strategy ?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onCloseDelete}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    removeStrategy(player, strategy.id);
                    onCloseDelete();
                  }}
                  startContent={
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                  }
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit strategy ({strategy.name})
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
                      <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>
                    }
                  >
                    Edit strategy
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Popover
        isOpen={open}
        onOpenChange={(open) => setOpen(open)}
        placement={player === Players.PLAYER_1 ? "right" : "bottom"}
        showArrow
      >
        <PopoverTrigger>
          <td
            className={cn(
              "sticky bg-content2 z-10 cursor-pointer",
              player === Players.PLAYER_1 ? "left-0" : "top-0"
            )}
          >
            <div
              className={cn(
                "flex h-[3rem] px-[0.5rem] text-[11pt] min-w-[6rem] whitespace-nowrap rounded-md border border-divider justify-center items-center bg-content1 hover:bg-content3 duration-250 transition-background",
                (player === Players.PLAYER_1 &&
                  highlightedPlayer1Strategies.has(strategy.id)) ||
                  (player === Players.PLAYER_2 &&
                    highlightedPlayer2Strategies.has(strategy.id) &&
                    "bg-[hsl(var(--heroui-primary)/0.5)]")
              )}
            >
              {strategy.name}
            </div>
          </td>
        </PopoverTrigger>

        <PopoverContent className="flex-row gap-[0.5rem] p-[0.3rem]">
          <Button
            isIconOnly
            variant="light"
            color="danger"
            onPress={() => {
              setOpen(false);
              onOpenDelete();
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </Button>
          <Button
            isIconOnly
            variant="light"
            onPress={() => {
              setOpen(false);
              onOpenEdit();
            }}
          >
            <FontAwesomeIcon icon={faPenAlt}></FontAwesomeIcon>
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
