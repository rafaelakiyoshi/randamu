type WheelProps = {
  competitors: string[];
  rotation: number;
  spinDurationSeconds: number;
  isSpinning: boolean;
  segmentAngle: number;
};

function stringToHslColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    // Simple hash function (FNV-1a like) to generate a large integer from the string.
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer for consistent behavior
  }

  // Ensure hash is positive for modulo operations
  const positiveHash = Math.abs(hash);

  // Hue (0-360): Distribute evenly across the entire color spectrum using the hash.
  const hue = positiveHash % 360;

  // Saturation (S): Fixed to a high value (e.g., 75-85%) for vibrancy.
  // This makes the colors "pop" against a dark background.
  const saturation = 60; // Example: 80%

  // Lightness (L): Fixed to a mid-range value (e.g., 55-65%) for good contrast with white text.
  // This prevents colors from being too dark or too washed out.
  const lightness = 70; // Example: 60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const Wheel: React.FC<WheelProps> = ({ competitors, rotation, isSpinning, spinDurationSeconds, segmentAngle }) => {
  return (
    <>
    
     <style>
        {`
        .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem; /* Equivalent to p-4 */
        }

        .card {
            max-width: 32rem; /* Equivalent to max-w-md */
            width: 100%;
            background-color: #2d3748; /* Equivalent to bg-gray-800 */
            border-radius: 0.75rem; /* Equivalent to rounded-xl */
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* Equivalent to shadow-2xl */
            padding: 1.5rem; /* Equivalent to p-6 */
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 2rem; /* Equivalent to space-y-8 */
        }


        .wheel-container {
            position: relative;
            width: 20rem; /* Equivalent to w-80 */
            height: 20rem; /* Equivalent to h-80 */
        }

        .pointer {
            position: absolute;
            top: 50%; /* Center vertically */
            right: -1rem; /* Position just outside the right edge */
            transform: translateY(-50%); /* Align triangle vertically */
            z-index: 10;
            width: 0;
            height: 0;
            border-right: 30px solid #facc15; /* Make it point right */
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07));
        }

        .wheel-svg {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
            transform-origin: center;
        }

        .spin-button {
            padding: 0.75rem 2rem;
            border-radius: 9999px;
            font-size: 1.125rem;
            font-weight: 700;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transform: scale(1);
            background-image: linear-gradient(to right, #3b82f6, #9333ea);
            color: white;
            border: none;
            cursor: pointer;
        }

        .spin-button:hover {
            background-image: linear-gradient(to right, #2563eb, #7e22ce);
        }

        .spin-button:active {
            transform: scale(0.95);
        }

        .spin-button:disabled {
            background-color: #4a5568;
            color: #a0aec0;
            cursor: not-allowed;
            transform: scale(0.95);
        }

        .winner-display {
            margin-top: 1.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: #facc15;
            animation: bounce 1s infinite;
        }

        .instructions {
            text-align: center;
            color: #a0aec0;
            font-size: 0.875rem;
            margin-top: 1rem;
        }

        /* Keyframes for bounce animation */
        @keyframes bounce {
            0%, 100% {
                transform: translateY(-25%);
                animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
            }
            50% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            }
        }
        `}
      </style>
    <div className="wheel-container">
    <div className="pointer" />

    <svg
      viewBox="0 0 200 200" // SVG viewbox for 200x200 canvas
      className="wheel-svg"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: isSpinning ? `transform ${spinDurationSeconds}s cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none',
      }}
    >
      {competitors.map((competitor, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = (index + 1) * segmentAngle;
        const largeArcFlag = segmentAngle > 180 ? 1 : 0;

        // Calculate SVG path coordinates for each segment
        const x1 = 100 + 100 * Math.cos((Math.PI / 180) * startAngle);
        const y1 = 100 + 100 * Math.sin((Math.PI / 180) * startAngle);
        const x2 = 100 + 100 * Math.cos((Math.PI / 180) * endAngle);
        const y2 = 100 + 100 * Math.sin((Math.PI / 180) * endAngle);

        // Calculate text position in the middle of the segment
        const textAngle = startAngle + segmentAngle / 2;
        const textRadius = 70; // Distance of text from center
        const textX = 100 + textRadius * Math.cos((Math.PI / 180) * textAngle);
        const textY = 100 + textRadius * Math.sin((Math.PI / 180) * textAngle);

        return (
          <g key={index}>
            <path
              d={`M 100,100 L ${x1},${y1} A 100,100 0 ${largeArcFlag},1 ${x2},${y2} Z`}
              fill={stringToHslColor(competitor)}
              stroke="#374151" // Darker border for segments
              strokeWidth="0.5"
            />
            <text
              x={textX}
              y={textY}
              fill="white"
              fontSize="7"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${textAngle}, ${textX}, ${textY})`}
              style={{ fontWeight: 'bold', userSelect: 'none' }}
            >
              {competitor}
            </text>
          </g>
        );
      })}
    </svg>
  </div>
    </>
  )
}