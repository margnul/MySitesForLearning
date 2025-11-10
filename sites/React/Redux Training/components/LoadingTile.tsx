import { useSelector } from "react-redux";
import type { RootState } from "../src/store/store.ts";


function LoadingTile() {
  const isLoading = useSelector((state: RootState) => state.counter.loading)

  return (
    <>
      {isLoading && (<div className="loading-tile">
        <p className="h2 loading-tile__text">
          Loading. Please wait...
        </p>  
      </div>)}
    </>
  )
}

export default LoadingTile