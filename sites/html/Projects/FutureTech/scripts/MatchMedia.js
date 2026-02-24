import pxToRem from "./utils/pxToRem.js"

const MatchMedia = {
  mobile: window.matchMedia(`(max-width:= ${pxToRem(767.98)}rem)`),

}

export default MatchMedia