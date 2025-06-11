import { WheelWrapper } from "./components/WheelWrapper";
import { atomWithStorage} from 'jotai/utils'
import './App.css';
import {  useAtomValue } from "jotai";
import Card from "./components/Card/Card";
import Title from "./components/Title/Title";

export const contestsAtom = atomWithStorage('contests', {
  ['ONDE VAMOS COMER']: ['k2', 'Five Guys', 'Torinos', 'Parma Cafe', 'W&G', 'Kinton', 'Something else'],
  ['O QUE VAMOS JOGAR']: ['poker', 'damas', 'xadrez', 'sinuca', 'ping pong', 'video game', 'truco']
});
// Main App component
export default function App() {
  const contests = useAtomValue(contestsAtom)

  if (Object.keys(contests).length === 0) {
    return (<>
    You do not have existing contests. Create one here
    </>)
  }

  
  return (
    <>
      <WheelWrapper contestKey={Object.keys(contests)[0]} />
        {/* <Card style={{ marginBottom: '1rem', cursor: 'pointer'}}>
          <Title style={{ fontSize: '2rem'}} >
            {Object.keys(contests)[0]}
          </Title>
        </Card>

        <Card style={{ marginBottom: '1rem', cursor: 'pointer'}}>
          <Title style={{ fontSize: '2rem'}} >
            {Object.keys(contests)[1]}
          </Title>
        </Card> */}
    </>
  );
}
