import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

import ActionButton from '../components/ActionButton.tsx';
import LoadingTile from '../components/LoadingTile.tsx';
import MessagesConsole from '../components/MessagesConsole.tsx';

import buttons from "../src/consts/buttons";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);


  return (
    <>
      <div className="input-tile">
        <h1 className="h3 input-tile__title">Some title</h1>
        <div className="input-tile__value">
          <h2>{count}</h2>
        </div>
        <div className="input-tile__buttons-wrapper">
          {/* <ActionButton ActionType={ActionButtonTypes.Plus} ></ActionButton>
          <ActionButton ActionType={ActionButtonTypes.Minus} ></ActionButton>
          <ActionButton ActionType={ActionButtonTypes.Reset} ></ActionButton> */}

          {
            buttons.map(btn => (
              <ActionButton key={btn.ID} {...btn} count={count}></ActionButton>
            ))
          }

        </div>
      </div>
      <LoadingTile></LoadingTile>
      <MessagesConsole></MessagesConsole>
    </>
  )
}

export default App
