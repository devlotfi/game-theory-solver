import { Input } from "@heroui/react";
import { useContext } from "react";
import { SolverContext } from "../context/solver-context";
import { Players } from "../types/players";

interface TableCellProps {
  gains: [number, number];
  coords: [number, number];
}

export default function TableCell({ gains, coords }: TableCellProps) {
  const { setGainValue } = useContext(SolverContext);

  return (
    <td className="h-[4rem] w-[6rem]">
      <div className="flex h-full w-full px-[0.5rem] rounded-md justify-center items-center bg-background border border-divider">
        <div className="flex">
          <div className="flex text-[20pt]">(</div>
          <Input
            type="number"
            variant="underlined"
            className="mt-[0.3rem]"
            value={gains[0].toString()}
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (Number.isNaN(value)) {
                value = 0;
              }
              setGainValue(coords, Players.PLAYER_1, value);
            }}
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
            variant="underlined"
            className="mt-[0.3rem]"
            value={gains[1].toString()}
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (Number.isNaN(value)) {
                value = 0;
              }
              setGainValue(coords, Players.PLAYER_2, value);
            }}
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
