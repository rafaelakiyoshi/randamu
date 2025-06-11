import  { useState } from 'react';
import { Wheel } from './Wheel';
import Button from './Button';
import Card from './Card/Card';
import Title from './Title/Title';
import { selectAtom } from 'jotai/utils';
import { contestsAtom } from '../App';
import React from 'react';
import { useAtomValue } from 'jotai';

type WheelWrapperProps = {
  contestKey: string
}
export const WheelWrapper: React.FC<WheelWrapperProps> = ({ contestKey }) => {
  const wheelAtom = React.useMemo(() => selectAtom(contestsAtom, (contests: Record<string, string[]>) => contests[contestKey]), [contestKey])
  const segments = useAtomValue(wheelAtom);

  const segmentAngle = 360 / segments.length;
  const [rotation, setRotation] = useState(-segmentAngle / 2);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string>();
  const spinDurationSeconds = 3; // Spin duration


  const calculateTargetRotation = (segmentIndex: number, currentTotalRotation: number): number => {
    const minFullSpins = 5;
    const additionalSpins = Math.floor(Math.random() * 8); // 0 to 7 additional spins
    const totalFullSpins = minFullSpins + additionalSpins;
    let exactTargetAngle = -(segmentIndex * segmentAngle + segmentAngle / 2);
    exactTargetAngle = (exactTargetAngle % 360 + 360) % 360;
    const currentVisualRotation = (currentTotalRotation % 360 + 360) % 360;
    const degreesToMove = (exactTargetAngle - currentVisualRotation + 360) % 360;
    const finalRotation = currentTotalRotation + (totalFullSpins * 360) + degreesToMove;
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
        .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: rem; /* Equivalent to p-4 */
        }
        
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

      <div className="container">
        <Card>
          <Title>
            {contestKey}
          </Title>

          <Wheel competitors={segments} rotation={rotation} spinDurationSeconds={spinDurationSeconds} isSpinning={isSpinning} segmentAngle={segmentAngle} /> 
          <Button onClick={handleSpin} disabled={isSpinning} loading={isSpinning} />
          
            <div className="winner-display" style={{ margin: 0}}>
              {winner ? `Winner: ${winner}` : ''}
            </div>
          
        </Card>
      </div>
    </>
  );
}
