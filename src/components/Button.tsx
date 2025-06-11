
type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}
const Button: React.FC<ButtonProps> = ({ onClick, disabled, loading }) => {
  return (
    <>
         <style>
        {`
        .button {
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

        .button:hover {
            background-image: linear-gradient(to right, #2563eb, #7e22ce);
        }

        .button:active {
            transform: scale(0.95);
        }

        .button:disabled {
            background-color: #4a5568;
            color: #a0aec0;
            cursor: not-allowed;
            transform: scale(0.95);
        }

        `}
      </style>
    <button
    onClick={onClick}
    disabled={loading || disabled}
    className={`button`}
  >
    {loading ? 'SPINNING...' : 'SPIN!'}
  </button>
    </>
  )
}

export default Button;