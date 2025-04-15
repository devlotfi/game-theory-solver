import { cn } from "@heroui/react";
import { ComponentProps, PropsWithChildren } from "react";

interface Props {
  classNames: {
    td?: ComponentProps<"td">;
    container?: ComponentProps<"div">;
  };
}

export default function TableCell({
  children,
  classNames: { td, container },
}: PropsWithChildren<Props>) {
  const { className: tdClassName, ...tdProps } = td ?? {};
  const { className: containerClassName, ...containerProps } = container ?? {};

  return (
    <td className={cn("h-[3rem] w-[6rem]", tdClassName)} {...tdProps}>
      <div
        className={cn(
          "flex h-full w-full px-[0.5rem] rounded-md cursor-pointer justify-center items-center bg-background border border-divider hover:bg-content3 duration-250 transition-background",
          containerClassName
        )}
        {...containerProps}
      >
        {children}
      </div>
    </td>
  );
}
