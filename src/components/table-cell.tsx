import {
  Button,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useContext } from "react";
import { SolverContext } from "../context/solver-context";
import * as yup from "yup";
import { useFormik } from "formik";
import { ValidatedInput } from "./validated-input";

interface TableCellProps {
  gains: [number, number];
  coords: [number, number];
}

export default function TableCell({ gains, coords }: TableCellProps) {
  const { setGainValue, highlightedCells } = useContext(SolverContext);

  const formik = useFormik({
    initialValues: {
      gainsPlayer1: gains[0],
      gainsPlayer2: gains[1],
    },
    validationSchema: yup.object({
      gainsPlayer1: yup.number().required(),
      gainsPlayer2: yup.number().required(),
    }),
    onSubmit(values) {
      setGainValue(coords, [values.gainsPlayer1, values.gainsPlayer2]);
    },
  });

  return (
    <td className="h-[3rem] w-[6rem]">
      <Popover
        placement="bottom"
        showArrow
        onOpenChange={(open) => {
          if (!open) {
            formik.submitForm();
          }
        }}
      >
        <PopoverTrigger>
          <div
            className={cn(
              "flex h-full w-full px-[0.5rem] rounded-md cursor-pointer justify-center items-center bg-background border border-divider hover:bg-content3 duration-250 transition-background",
              highlightedCells.has(`[${coords[0]},${coords[1]}]`) &&
                "bg-[hsl(var(--heroui-primary)/0.5)]"
            )}
          >
            <div className="flex flex-1 justify-between items-center gap-[0.3rem]">
              <div className="flex text-[15pt] ">(</div>
              <div className="flex text-[15pt] ">{gains[0]}</div>
              <div className="flex text-[15pt] ">,</div>
              <div className="flex text-[15pt] ">{gains[1]}</div>
              <div className="flex text-[15pt] ">)</div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-[0.5rem]">
          <form onSubmit={formik.handleSubmit} className="flex gap-[0.5rem]">
            <ValidatedInput
              type="number"
              name="gainsPlayer1"
              placeholder="Strategy name"
              classNames={{
                inputWrapper: "w-[5rem]",
              }}
              formik={formik}
            ></ValidatedInput>
            <ValidatedInput
              type="number"
              name="gainsPlayer2"
              placeholder="Strategy name"
              classNames={{
                inputWrapper: "w-[5rem]",
              }}
              formik={formik}
            ></ValidatedInput>
            <Button type="submit" className="hidden"></Button>
          </form>
        </PopoverContent>
      </Popover>
    </td>
  );
}
