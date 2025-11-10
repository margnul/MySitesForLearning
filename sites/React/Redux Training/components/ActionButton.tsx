import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../src/store/features/counter/counterSlice";
import type { AppDispatch } from "../src/store/store";
import type { ActionButtonType } from "../src/types/ActionButtonTypes";
import { addAsync, loadCounter, saveCounter, blockForValueSeconds } from '../src/store/features/counter/counterThunks.ts';
import type { RootState } from "../src/store/store.ts";

export interface ActionButtonProps {
  ActionType: ActionButtonType,
  ButtonText: string,
  ID: number,
  BackgroundColor: string,
  count: number,
}

function ActionButton({ ActionType, ButtonText, BackgroundColor, count }: ActionButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.counter.loading)

  const ActionsMap: Record<ActionButtonType, () => void> = {
    plus: () => dispatch(increment()),
    minus: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
    addAsync: () => dispatch(addAsync()),
    loadCounter: () => dispatch(loadCounter()),
    saveCounter: () => dispatch(saveCounter()),
    blockForValueSeconds: () => dispatch(blockForValueSeconds(count)),
  }
  
  const handleClick = ActionsMap[ActionType];

  return (
    <button
      onClick={isLoading ? () => { } : handleClick }
      type="button"
      className="input-tile__button"
      style={{ backgroundColor: BackgroundColor }}
    >
      {
        ButtonText
      }
    </button>
  )
}

export default ActionButton;