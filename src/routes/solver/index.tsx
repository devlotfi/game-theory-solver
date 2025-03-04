import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/solver/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <table className="border-separate border-spacing-[1rem]">
        <tbody>
          <tr>
            <td
              className="border border-black w-16 h-16"
              colSpan={2}
              rowSpan={2}
            >
              lol
            </td>
            <td className="border border-black w-16 h-16" colSpan={3}>
              lol
            </td>
          </tr>
          <tr>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
          </tr>
          <tr>
            <td className="border border-black w-16 h-16" rowSpan={3}></td>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
          </tr>
          <tr>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
          </tr>
          <tr>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
            <td className="border border-black w-16 h-16">lol</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
