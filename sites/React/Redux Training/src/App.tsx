import { useSelector } from "react-redux";
import { useState } from "react"
import type { RootState } from "./store/store";

import ActionButton from '../components/ActionButton.tsx';
import LoadingTile from '../components/LoadingTile.tsx';
import MessagesConsole from '../components/MessagesConsole.tsx';
import ButtonClicksStats from '../components/ButtonClicksStats.tsx'

import buttons from "../src/consts/buttons";



function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const [buttonClicks, changeButtonClicks] = useState(0)
  
  function plusClick() {
    changeButtonClicks(buttonClicks + 1)
  }

  function resetClicks() {
    changeButtonClicks(0)
  }

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
              <ActionButton key={btn.ID} {...btn} count={count} plusClick={plusClick}></ActionButton>
            ))
          }

        </div>
      </div>
      <LoadingTile></LoadingTile>
      <MessagesConsole></MessagesConsole>
      <ButtonClicksStats number={buttonClicks} resetClicks={resetClicks}></ButtonClicksStats>
    </>
  )
}

export default App
