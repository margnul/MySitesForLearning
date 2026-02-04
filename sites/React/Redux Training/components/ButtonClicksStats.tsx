import { memo,  useEffect } from "react"
type ButtonClicksStatsProps = {
  number: number,
  resetClicks: () => void
}

function ButtonClicksStats(props: ButtonClicksStatsProps) {
  const { number, resetClicks } = props
  
  console.log("<ButtonClicksStats />: Render")

  useEffect(() => {
    console.log("DOM UPDATED");
  });

  return (
    <div className="button-clicks-stats">
      <div className="button-clicks-stats__wrapper">
        <h2 className="button-clicks-stats__number">
          {number}
        </h2>
        <button
          onClick={
            () => {
              resetClicks()
            }
          }
          type="button"
          className="button-clicks-stats__button-reset"
        >
          reset
        </button>
      </div>
    </div>
  )
}


export default ButtonClicksStats