import { useState } from "react";
import { Wheel } from "./Wheel";
import Button from "./Button/Button";
import Title from "./Title/Title";
import { selectAtom } from "jotai/utils";
import React from "react";
import { useAtomValue } from "jotai";
import { contestsAtom } from "../pages/HomePage";
import Container from "./Container/Container";
import { useNavigate } from "react-router";

type WheelWrapperProps = {
  contestKey: string;
};
export const WheelWrapper: React.FC<WheelWrapperProps> = ({ contestKey }) => {
  const navigate = useNavigate();
  const wheelAtom = React.useMemo(
    () =>
      selectAtom(
        contestsAtom,
        (contests: Record<string, string[]>) => contests[contestKey]
      ),
    [contestKey]
  );
  const segments = useAtomValue(wheelAtom) || [""];

  const segmentAngle = 360 / segments.length;
  const [rotation, setRotation] = useState(-segmentAngle / 2 || 0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string>();
  const spinDurationSeconds = 6; // Spin duration

  if (segments.length === 0) return null;

  const calculateTargetRotation = (
    segmentIndex: number,
    currentTotalRotation: number
  ): number => {
    const minFullSpins = 20;
    const additionalSpins = Math.floor(Math.random() * 8); // 0 to 7 additional spins
    const totalFullSpins = minFullSpins + additionalSpins;
    let exactTargetAngle = -(segmentIndex * segmentAngle + segmentAngle / 2);
    exactTargetAngle = ((exactTargetAngle % 360) + 360) % 360;
    const currentVisualRotation = ((currentTotalRotation % 360) + 360) % 360;
    const degreesToMove =
      (exactTargetAngle - currentVisualRotation + 360) % 360;
    const finalRotation =
      currentTotalRotation + totalFullSpins * 360 + degreesToMove;
    return finalRotation;
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(undefined); // Clear previous winner

    const randomIndex = Math.floor(Math.random() * segments.length);
    const selectedSegment = segments[randomIndex];

    const newRotation = calculateTargetRotation(randomIndex, rotation); // Pass current `rotation` state
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedSegment);
    }, spinDurationSeconds * 1000);
  };

  return (
    <>
      {/* Pure CSS Styles */}
      <style>
        {`
        .winner-display {
            height: 2rem;
            margin-top: 1.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: #facc15;
            animation: bounce 1s infinite;
        }

        `}
      </style>

      <Container>
        <span
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            textDecoration: "underline",
          }}
        >
          GO BACK
        </span>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "89vh",
          }}
        >
          <Title>{contestKey.toUpperCase()}</Title>

          <Wheel
            competitors={segments}
            rotation={rotation}
            spinDurationSeconds={spinDurationSeconds}
            isSpinning={isSpinning}
            segmentAngle={segmentAngle}
          />
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            loading={isSpinning}
          >
            SPIN!
          </Button>

          <div className="winner-display" style={{ margin: 0 }}>
            {winner ? `Winner: ${winner}` : ""}
          </div>
        </span>
        <div style={{ float: "right" }}>
          <Button
            onClick={() => navigate(`/edit/${encodeURIComponent(contestKey)}`)}
            disabled={isSpinning}
            loading={isSpinning}
            style={{ fontSize: "2rem", padding: "0.2rem 2rem" }}
          >
            ✎
          </Button>
        </div>
      </Container>
    </>
  );
};
