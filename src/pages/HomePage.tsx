import { atomWithStorage } from "jotai/utils";
import { useAtomValue } from "jotai";
import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import { useNavigate } from "react-router";
import Card from "../components/Card/Card";

export const contestsAtom = atomWithStorage(
  "contests",
  {},
  {
    getItem: (key, initialValue) => {
      const res = localStorage.getItem(key);
      if (res) return JSON.parse(res);
      return initialValue;
    },
    setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    removeItem: (key) => localStorage.removeItem(key),
  },
  { getOnInit: true }
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const contests = useAtomValue(contestsAtom);

  const onClick = () => {
    navigate("/create");
  };

  if (Object.keys(contests).length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Title style={{ margin: "1em", textAlign: "center" }}>
          No Contests.
        </Title>
        <Button onClick={onClick} disabled={false} loading={false}>
          New Contest
        </Button>
      </div>
    );
  }

  return (
    <>
      <div style={{ height: "100vh", position: "relative" }}>
        <div style={{ height: "90vh", padding: "2rem", overflow: "auto" }}>
          {Object.keys(contests).map((contestKey) => {
            return (
              <div
                key={contestKey}
                onClick={() =>
                  navigate(`/contest/${encodeURIComponent(contestKey)}`)
                }
              >
                <Card
                  style={{
                    padding: "1rem",
                    cursor: "pointer",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    marginBottom: "1rem",
                  }}
                >
                  <Title style={{ fontSize: "1.5rem" }}>{contestKey}</Title>
                </Card>
              </div>
            );
          })}
        </div>
        <Button
          onClick={onClick}
          disabled={false}
          loading={false}
          style={{
            position: "absolute",
            right: "5rem",
            left: "5rem",
            bottom: "3rem",
          }}
        >
          New Contest
        </Button>
      </div>
    </>
  );
};

export default HomePage;
