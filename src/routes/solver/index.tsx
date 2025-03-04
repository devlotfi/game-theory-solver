import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/solver/")({
  component: RouteComponent,
});

function TableCell() {
  return (
    <td className="h-[4rem] w-[6rem]">
      <div className="flex h-full w-full rounded-md justify-center items-center bg-content1">
        (1 , 10)
      </div>
    </td>
  );
}

function StrategyTableCell() {
  return (
    <td className="h-[4rem] min-w-[6rem]">
      <div className="flex h-full w-full rounded-md border border-divider justify-center items-center bg-content1">
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
      <div className="flex items-start p-[1rem] max-w-[calc(100dvw-3rem)] max-h-[calc(100dvh-3rem)] overflow-auto">
        <table>
          <tbody>
            <tr>
              <td></td>
              <StrategyTableCell></StrategyTableCell>
              <StrategyTableCell></StrategyTableCell>
              <StrategyTableCell></StrategyTableCell>
            </tr>
            <tr>
              <StrategyTableCell></StrategyTableCell>
              <td>lol</td>
              <td>lol</td>
              <td>lol</td>
            </tr>
            <tr>
              <StrategyTableCell></StrategyTableCell>
              <td>lol</td>
              <td>lol</td>
              <td>lol</td>
            </tr>
            <tr>
              <StrategyTableCell></StrategyTableCell>
              <td>lol</td>
              <td>lol</td>
              <td>lol</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
