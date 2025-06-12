import "./Card.css";

type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};
const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  );
};
export default Card;
