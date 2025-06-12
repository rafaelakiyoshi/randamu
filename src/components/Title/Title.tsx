import "./Title.css";

type TitleProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};
const Title: React.FC<TitleProps> = ({ children, ...props }) => {
  return (
    <span className="title" {...props}>
      {children}
    </span>
  );
};
export default Title;
