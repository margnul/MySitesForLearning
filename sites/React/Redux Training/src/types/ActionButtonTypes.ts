
export const ActionButtonTypes = {
  Plus: "plus",
  Minus: "minus",
  Reset: "reset",
  addAsync: "addAsync",
  loadCounter: "loadCounter",
  saveCounter: "saveCounter",
  blockForValueSeconds: "blockForValueSeconds",
} as const;

export type ActionButtonType = typeof ActionButtonTypes[keyof typeof ActionButtonTypes];