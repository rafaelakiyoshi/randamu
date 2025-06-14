import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { contestsAtom } from "./HomePage";
import { useNavigate, useParams } from "react-router";
import React from "react";
import { selectAtom } from "jotai/utils";
import Modal from "../components/Modal/Modal";

const EditContestPage: React.FC = () => {
  const [modal, setModal] = React.useState(false);
  const { contestId } = useParams<string>();
  const wheelAtom = React.useMemo(
    () =>
      selectAtom(
        contestsAtom,
        (contests: Record<string, string[]>) => contests[contestId as string]
      ),
    [contestId]
  );
  const initialContestValue = useAtomValue(wheelAtom);
  const [contest, setContest] = useState({
    title: contestId as string,
    contestors: initialContestValue,
  });
  const updateContest = useSetAtom(contestsAtom);
  const navigate = useNavigate();

  const handleCreate = () => {
    updateContest((current) => {
      return { ...current, [contest.title]: contest.contestors };
    });
    navigate(`/contest/${encodeURIComponent(contest.title)}`);
  };

  const handleDelete = () => {
    updateContest((current) => {
      const newContests: Record<string, []> = { ...current };
      delete newContests[contest.title];
      return { ...newContests };
    });
    navigate(`/`);
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

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            marginTop: ".5rem",
          }}
        >
          <Button
            onClick={() => setModal(true)}
            disabled={false}
            loading={false}
            style={{
              width: "40%",
              backgroundImage:
                "linear-gradient(to right,rgb(209, 46, 9),rgb(230, 136, 48))",
            }}
          >
            DELETE
          </Button>
          <Button
            onClick={handleCreate}
            disabled={false}
            loading={false}
            style={{
              width: "40%",
              backgroundImage:
                "linear-gradient(to right,rgb(9, 153, 43),rgb(166, 230, 48))",
            }}
          >
            SAVE
          </Button>
        </div>
      </div>
      {modal && (
        <Modal>
          <Title
            style={{
              fontSize: "2rem",
              backgroundImage:
                "linear-gradient(to right,rgb(28, 22, 21),rgb(94, 90, 87))",
            }}
          >
            Are you sure?
          </Title>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "3.5rem",
            }}
          >
            <Button
              onClick={() => setModal(false)}
              disabled={false}
              loading={false}
              style={{
                width: "45%",
                backgroundImage:
                  "linear-gradient(to right,rgb(209, 46, 9),rgb(230, 136, 48))",
              }}
            >
              NO
            </Button>
            <Button
              onClick={handleDelete}
              disabled={false}
              loading={false}
              style={{
                width: "45%",
                backgroundImage:
                  "linear-gradient(to right,rgb(9, 153, 43),rgb(166, 230, 48))",
              }}
            >
              YES
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditContestPage;
