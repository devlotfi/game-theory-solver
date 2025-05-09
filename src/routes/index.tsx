import { createFileRoute, useNavigate } from "@tanstack/react-router";
import SolverSVG from "../assets/solver.svg";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { CardHeader } from "@heroui/react";
import Navbar from "../components/navbar";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col">
      <Navbar></Navbar>

      <div className="flex dotted-bg-light dark:dotted-bg-dark flex-1 lg:items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center max-w-screen-lg p-[1rem] lg:p-[2rem] gap-[2rem]">
          <img
            src={SolverSVG}
            alt="calculator"
            className=" h-[8em] lg:h-[16rem]"
          />
          <Card className="p-[1rem] border border-divider">
            <CardHeader>
              <div className="flex text-[20pt] font-bold">
                Welcome to game theory solver.
              </div>
            </CardHeader>
            <CardBody className="flex-col gap-[0.7rem]">
              <div className="flex">
                This software allows you to analyze payoff matrices, identify
                dominant strategies, and reduce the matrix by eliminating
                unnecessary strategies. With this tool, you can explore the
                fundamentals of game theory and efficiently determine optimal
                solutions.
              </div>
              <div className="flex">
                This project was developed as part of the "Optimization
                Techniques" module at USTHB.
              </div>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                onPress={() => navigate({ to: "/solver" })}
              >
                Start
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
