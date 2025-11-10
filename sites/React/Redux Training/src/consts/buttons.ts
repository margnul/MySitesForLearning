import { ActionButtonTypes } from "../../src/types/ActionButtonTypes";

const buttons = [
  {
    ActionType: ActionButtonTypes.Plus,
    ButtonText: "+",
    ID: 1,
    BackgroundColor: "#2196f3",
  },
  {
    ActionType: ActionButtonTypes.Minus,
    ButtonText: "-",
    ID: 2,
    BackgroundColor: "#f44336",
  },
  {
    ActionType: ActionButtonTypes.Reset,
    ButtonText: "reset",
    ID: 3,
    BackgroundColor: "#9e9e9e",
  },
  {
    ActionType: ActionButtonTypes.addAsync,
    ButtonText: "+5",
    ID: 4,
    BackgroundColor: "#0067acff",
  },
  {
    ActionType: ActionButtonTypes.loadCounter,
    ButtonText: "load",
    ID: 5,
    BackgroundColor: "#00fd4cff",
  },
  {
    ActionType: ActionButtonTypes.saveCounter,
    ButtonText: "save",
    ID: 6,
    BackgroundColor: "#0c8b00ff",
  },
  {
    ActionType: ActionButtonTypes.blockForValueSeconds,
    ButtonText: "block",
    ID: 7,
    BackgroundColor: "#2f0736ff",
  },
] as const;

export default buttons
