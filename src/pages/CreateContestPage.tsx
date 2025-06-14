import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { contestsAtom } from "./HomePage";
import { useNavigate } from "react-router";

const initialContestValue: { title: string; contestors: string[] } = {
  title: "",
  contestors: [""],
};

const CreateContestPage: React.FC = () => {
  const [contest, setContest] = useState(initialContestValue);
  const createContest = useSetAtom(contestsAtom);
  const navigate = useNavigate();

  const handleCreate = () => {
    createContest((current) => {
      return { ...current, [contest.title]: contest.contestors };
    });
    navigate(`/contest/${encodeURIComponent(contest.title)}`);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContest({ ...contest, title: value });
  };

  const handleChangeContestor = (value: string, index: number) => {
    const newContestors = [...contest.contestors];
    newContestors[index] = value;
    setContest({ ...contest, contestors: newContestors });
  };

  const handleAddContestor = () => {
    const newContestors = [...contest.contestors];
    newContestors.push("");
    setContest({ ...contest, contestors: newContestors });
  };

  const handleRemoveContestor = (index: number) => {
    setContest({
      ...contest,
      contestors: contest.contestors.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "relative",
        }}
      >
        <div style={{ paddingLeft: "2rem", paddingTop: "2rem" }}>
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
          <Title>CONTEST</Title>
        </div>
        <div style={{ height: "80vh", padding: "2rem", overflow: "auto" }}>
          <input
            type="text"
            placeholder="Contest title"
            onChange={handleChangeTitle}
            value={contest.title}
            style={{ marginBottom: "2rem" }}
          />
          <input
            type="text"
            placeholder="Contestor"
            onChange={(e) => handleChangeContestor(e.target.value, 0)}
            value={contest.contestors[0]}
            style={{ marginBottom: "1rem" }}
          />

          {contest.contestors.map((_, index) => {
            if (index === 0) return;
            return (
              <div
                style={{ width: "100%", display: "flex", marginBottom: "1rem" }}
                key={index}
              >
                <input
                  type="text"
                  placeholder="Contestor"
                  onChange={(e) => handleChangeContestor(e.target.value, index)}
                  value={contest.contestors[index]}
                  autoFocus
                />
                <Button
                  onClick={() => handleRemoveContestor(index)}
                  disabled={false}
                  loading={false}
                  style={{
                    padding: "0 1rem",
                    borderRadius: "5px",
                    fontSize: "1.5rem",
                    marginLeft: "1rem",
                    backgroundImage:
                      "linear-gradient(to right,rgb(209, 46, 9),rgb(230, 136, 48))",
                  }}
                >
                  X
                </Button>
              </div>
            );
          })}

          <Button
            disabled={false}
            loading={false}
            onClick={handleAddContestor}
            style={{ width: "100%" }}
          >
            ADD CONTESTOR
          </Button>
        </div>

        <Button
          onClick={handleCreate}
          disabled={false}
          loading={false}
          style={{
            position: "absolute",
            right: "2rem",
            left: "2rem",
            bottom: "3rem",
          }}
        >
          CREATE
        </Button>
      </div>
    </>
  );
};

export default CreateContestPage;
