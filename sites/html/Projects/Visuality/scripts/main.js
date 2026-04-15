import ParagraphAnimation from "./ParagraphAnimation.js";
import TiilesScrollAnimation from "./TilesScrollAnimation.js"

//new ParagraphAnimation()
new TiilesScrollAnimation()


const obj = {
  then: () => {
    console.log('then')
  }
}

Promise.resolve(obj).then(console.log("when"))