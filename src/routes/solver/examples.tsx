import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "../../components/navbar";
import { Accordion, AccordionItem, Button, Divider } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faArrowUpRightFromSquare,
  faCircleNodes,
} from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren, useContext } from "react";
import { SolverContext } from "../../context/solver-context";
import { Strategy } from "../../types/strategy";

export const Route = createFileRoute("/solver/examples")({
  component: RouteComponent,
});

function SectionTitle({ children }: PropsWithChildren) {
  return <div className="flex font-bold text-[16pt]">{children}</div>;
}

function SectionParagraph({ children }: PropsWithChildren) {
  return (
    <div className="flex text-[13pt] pl-[1rem] items-center gap-[1rem]">
      <div className="flex self-start mt-[0.6rem] h-[0.5rem] w-[0.5rem] bg-foreground opacity-60 rounded-full"></div>
      {children}
    </div>
  );
}

function RouteComponent() {
  const navigate = useNavigate();
  const { solverState, setSolverState } = useContext(SolverContext);

  return (
    <div className="flex flex-col flex-1">
      <Navbar></Navbar>

      <div className="flex flex-1 flex-col items-center">
        <div className="flex flex-col gap-[1rem] pt-[3rem] w-full max-w-screen-lg">
          <div className="flex flex-col items-start gap-[1rem] px-[1rem]">
            <Button
              variant="bordered"
              startContent={
                <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
              }
              onPress={() =>
                navigate({
                  to: "/solver",
                })
              }
            >
              Back to editor
            </Button>
            <div className="flex items-center gap-[1rem]">
              <FontAwesomeIcon
                icon={faCircleNodes}
                className="text-primary text-[25pt]"
              ></FontAwesomeIcon>
              <div className="flex text-[20pt] font-black">
                Exmples used in networking
              </div>
            </div>
          </div>

          <Accordion
            variant="splitted"
            itemClasses={{
              base: "shadow-none border border-divider",
              content: "flex flex-col gap-[2rem] pb-[1rem]",
            }}
          >
            <AccordionItem
              key="1"
              title="The Prisoner’s Dilemma (P2P Networks and Free-Rider Problem)"
            >
              <Button
                variant="bordered"
                color="primary"
                endContent={
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                  ></FontAwesomeIcon>
                }
                onPress={() => {
                  setSolverState({
                    ...solverState,
                    gainsTable: [
                      [
                        [3, 3],
                        [0, 5],
                      ],
                      [
                        [5, 0],
                        [1, 1],
                      ],
                    ],
                    player1Strategies: [
                      new Strategy("Cooperate (Share)"),
                      new Strategy("Cheat (Download Only)"),
                    ],
                    player2Strategies: [
                      new Strategy("Cooperate (Share)"),
                      new Strategy("Cheat (Download Only)"),
                    ],
                    player1Name: "Player 1",
                    player2Name: "Player 2",
                  });
                  navigate({
                    to: "/solver",
                  });
                }}
              >
                Open in editor
              </Button>
              <Divider></Divider>

              <div className="flex flex-col">
                <SectionTitle>Context</SectionTitle>
                <SectionParagraph>
                  In a network where users compete for bandwidth, they can
                  choose an aggressive strategy (take maximum bandwidth) or a
                  peaceful strategy (share fairly).
                </SectionParagraph>
              </div>

              <div className="flex flex-col">
                <SectionTitle>Payoff Matrix</SectionTitle>
                <table className="border-collapse border border-gray-400 w-full mt-2">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">
                        Player 1 \ Player 2
                      </th>
                      <th className="border border-gray-400 p-2">
                        {" "}
                        Cooperate (Share)
                      </th>
                      <th className="border border-gray-400 p-2">
                        Cheat (Download Only)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2">
                        Cooperate (Share)
                      </td>
                      <td className="border border-gray-400 p-2">
                        (3,3) → Both benefit
                      </td>
                      <td className="border border-gray-400 p-2">
                        (0,5) → Player 2 gains more
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">
                        Cheat (Download Only)
                      </td>
                      <td className="border border-gray-400 p-2">
                        (5,0) → Player 1 gains more
                      </td>
                      <td className="border border-gray-400 p-2">
                        (1,1) → Both suffer
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              title="Hawk-Dove Game (Bandwidth Allocation in Networks)"
            >
              <Button
                variant="bordered"
                color="primary"
                endContent={
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                  ></FontAwesomeIcon>
                }
                onPress={() => {
                  setSolverState({
                    ...solverState,
                    gainsTable: [
                      [
                        [3, 3],
                        [1, 5],
                      ],
                      [
                        [5, 1],
                        [0, 0],
                      ],
                    ],
                    player1Strategies: [
                      new Strategy("Peaceful (Dove)"),
                      new Strategy("Aggressive (Hawk)"),
                    ],
                    player2Strategies: [
                      new Strategy("Peaceful (Dove)"),
                      new Strategy("Aggressive (Hawk)"),
                    ],
                    player1Name: "Player 1",
                    player2Name: "Player 2",
                  });
                  navigate({
                    to: "/solver",
                  });
                }}
              >
                Open in editor
              </Button>
              <Divider></Divider>

              <div className="flex flex-col">
                <SectionTitle>Context</SectionTitle>
                <SectionParagraph>
                  Each user maximizes their own bandwidth, but if everyone
                  overuses it, the network becomes congested
                </SectionParagraph>
              </div>

              <div className="flex flex-col">
                <SectionTitle>Payoff Matrix</SectionTitle>
                <table className="border-collapse border border-gray-400 w-full mt-2">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">
                        Player 1 \ Player 2
                      </th>
                      <th className="border border-gray-400 p-2">
                        Peaceful (Dove)
                      </th>
                      <th className="border border-gray-400 p-2">
                        Aggressive (Hawk)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2">
                        Peaceful (Dove)
                      </td>
                      <td className="border border-gray-400 p-2">
                        (3,3) → Fair Share
                      </td>
                      <td className="border border-gray-400 p-2">
                        (1,5) → Hawk dominates
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">
                        Aggressive (Hawk)
                      </td>
                      <td className="border border-gray-400 p-2">
                        (5,1) → Hawk dominates
                      </td>
                      <td className="border border-gray-400 p-2">
                        (0,0) → Network congestion
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem
              key="3"
              title="Network Security Game (Attacker vs. Defender)"
            >
              <Button
                variant="bordered"
                color="primary"
                endContent={
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                  ></FontAwesomeIcon>
                }
                onPress={() => {
                  setSolverState({
                    ...solverState,
                    gainsTable: [
                      [
                        [3, -1],
                        [-5, 5],
                      ],
                      [
                        [1, -2],
                        [0, 0],
                      ],
                    ],
                    player1Strategies: [
                      new Strategy("Ignore"),
                      new Strategy("Invest in Security"),
                    ],
                    player2Strategies: [
                      new Strategy("Simple Attack"),
                      new Strategy("Sophisticated Attack"),
                    ],
                    player1Name: "Defender",
                    player2Name: "Attacker",
                  });
                  navigate({
                    to: "/solver",
                  });
                }}
              >
                Open in editor
              </Button>
              <Divider></Divider>

              <div className="flex flex-col">
                <SectionTitle>Context</SectionTitle>
                <SectionParagraph>
                  An attacker can launch a simple attack (low cost, low success
                  rate) or a sophisticated attack (high cost, high impact).
                </SectionParagraph>
                <SectionParagraph>
                  A defender can either ignore the attack or invest in
                  protection.
                </SectionParagraph>
              </div>

              <div className="flex flex-col">
                <SectionTitle>Payoff Matrix</SectionTitle>
                <table className="border-collapse border border-gray-400 w-full mt-2">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">
                        Defender / Attacker
                      </th>
                      <th className="border border-gray-400 p-2">
                        Simple Attack
                      </th>
                      <th className="border border-gray-400 p-2">
                        Sophisticated Attack
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2">Ignore</td>
                      <td className="border border-gray-400 p-2">
                        (3,-1) → Minor risk
                      </td>
                      <td className="border border-gray-400 p-2">
                        (-5,5) → Major damage
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">
                        Invest in Security
                      </td>
                      <td className="border border-gray-400 p-2">
                        (1,-2) → Costly but safe
                      </td>
                      <td className="border border-gray-400 p-2">
                        (0,0) → Attack blocked
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem
              key="4"
              title="Routing Game in Networks (Braess’s Paradox)"
            >
              <Button
                variant="bordered"
                color="primary"
                endContent={
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                  ></FontAwesomeIcon>
                }
                onPress={() => {
                  setSolverState({
                    ...solverState,
                    gainsTable: [
                      [
                        [2, 2],
                        [3, 1],
                      ],
                      [
                        [1, 3],
                        [1, 1],
                      ],
                    ],
                    player1Strategies: [
                      new Strategy("Choose A"),
                      new Strategy("Choose B"),
                    ],
                    player2Strategies: [
                      new Strategy("Choose Route A"),
                      new Strategy("Choose Route B"),
                    ],
                    player1Name: "Player 1",
                    player2Name: "Player 2",
                  });
                  navigate({
                    to: "/solver",
                  });
                }}
              >
                Open in editor
              </Button>
              <Divider></Divider>

              <div className="flex flex-col">
                <SectionTitle>Context</SectionTitle>
                <SectionParagraph>
                  Each user selects the fastest route in a network (e.g., the
                  Internet).
                </SectionParagraph>
                <SectionParagraph>
                  If everyone chooses the same optimal route, it can become
                  congested and less efficient than an initially slower route.
                </SectionParagraph>
              </div>

              <div className="flex flex-col">
                <SectionTitle>Payoff Matrix</SectionTitle>
                <table className="border-collapse border border-gray-400 w-full mt-2">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">
                        Player 1 \ Player 2
                      </th>
                      <th className="border border-gray-400 p-2">
                        Choose Route A
                      </th>
                      <th className="border border-gray-400 p-2">
                        Choose Route B
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2">Choose A</td>
                      <td className="border border-gray-400 p-2">
                        (2,2) → Overloaded
                      </td>
                      <td className="border border-gray-400 p-2">
                        (3,1) → A gets congested
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2">Choose B</td>
                      <td className="border border-gray-400 p-2">
                        (1,3) → B gets congested
                      </td>
                      <td className="border border-gray-400 p-2">
                        (1,1) → Balanced
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
