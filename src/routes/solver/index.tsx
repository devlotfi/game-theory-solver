import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/solver/")({
  component: RouteComponent,
});

function TableCell() {
  return (
    <td className="h-[4rem] w-[6rem]">
      <div className="flex h-full w-full px-[0.5rem] rounded-md justify-center items-center bg-background border border-divider">
        <div className="flex">
          <div className="flex text-[20pt]">(</div>
          <Input
            type="number"
            isRequired
            placeholder="P1"
            classNames={{
              inputWrapper: "bg-content2 w-[5rem]",
              input: "text-[15pt]",
            }}
          />
          <div className="flex text-[20pt]">,</div>
          <Input
            type="number"
            isRequired
            placeholder="P2"
            classNames={{
              inputWrapper: "bg-content2 w-[5rem]",
              input: "text-[15pt]",
            }}
          />
          <div className="flex text-[20pt]">)</div>
        </div>
      </div>
    </td>
  );
}

function HorizontalStrategyTableCell() {
  return (
    <td className="sticky top-0 bg-content2 z-10">
      <div className="flex h-[4rem] min-w-[6rem] rounded-md border border-divider justify-center items-center bg-content1">
        Str
      </div>
    </td>
  );
}

function VerticalStrategyTableCell() {
  return (
    <td className="sticky left-0 bg-content2 z-10">
      <div className="flex h-[4rem] min-w-[6rem] rounded-md border border-divider justify-center items-center bg-content1">
        Str
      </div>
    </td>
  );
}

function RouteComponent() {
  return (
    <div className="grid flex-1 grid-cols-[3rem_auto] grid-rows-[3rem_auto]">
      <div className="flex border-divider border-r border-b"></div>
      <div className="flex justify-center items-center border-divider border-b">
        <div className="flex">Player 2</div>
      </div>
      <div className="flex justify-center items-center border-divider border-r">
        <div
          className="flex rotate-180"
          style={{
            textOrientation: "mixed",
            writingMode: "vertical-lr",
          }}
        >
          Player 2
        </div>
      </div>
      <div className="flex max-w-[calc(100dvw-3rem)] max-h-[calc(100dvh-3rem-4rem)] items-start overflow-auto">
        <table className="border-separate border-spacing-[0.5rem] inline-block m-auto">
          <tbody>
            <tr>
              <td className="sticky top-0 left-0 z-20 bg-content2"></td>
              <HorizontalStrategyTableCell></HorizontalStrategyTableCell>
              <HorizontalStrategyTableCell></HorizontalStrategyTableCell>
              <HorizontalStrategyTableCell></HorizontalStrategyTableCell>

              <td>
                <div className="flex">
                  <Button isIconOnly color="primary" variant="light" size="lg">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-[18pt]"
                    ></FontAwesomeIcon>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <VerticalStrategyTableCell></VerticalStrategyTableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <VerticalStrategyTableCell></VerticalStrategyTableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </tr>
            <tr>
              <VerticalStrategyTableCell></VerticalStrategyTableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </tr>

            <tr>
              <td>
                <div className="flex justify-center">
                  <Button isIconOnly color="primary" variant="light">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-[18pt]"
                    ></FontAwesomeIcon>
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
