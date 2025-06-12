import "./Button.css";

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  children: string;
  style?: React.CSSProperties;
};
const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  loading,
  children,
  ...props
}) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={loading || disabled}
        className={`button`}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
