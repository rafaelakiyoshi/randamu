import { WheelWrapper } from "../components/WheelWrapper";
import { useParams } from "react-router";

const WheelPage: React.FC = () => {
  const { contestId } = useParams<string>();
  return <WheelWrapper contestKey={contestId as string} />;
};

export default WheelPage;
