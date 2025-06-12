import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreateContestPage from "./pages/CreateContestPage";
import WheelPage from "./pages/WheelPage";
import EditContestPage from "./pages/EditContestPage";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="create" element={<CreateContestPage />} />
      <Route path="edit/:contestId" element={<EditContestPage />} />
      <Route path="contest/:contestId" element={<WheelPage />} />
    </Routes>
  );
};

export default CustomRoutes;
