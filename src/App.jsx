import { Toaster } from "react-hot-toast"
import Routes from "./routes"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./store/profileSlice";

function App() {
  const { isAuthorize } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isAuthorize){
      dispatch(getUserDetails())
    }
  },[dispatch, isAuthorize])

  return (
    <>
      <Routes />
      <Toaster
        toastOptions={{
          success: {
            style: {
              fontWeight: 'bold',
            },
          },
          error: {
            style: {
              fontWeight: 'bold',
            },
          },
        }}
      />
    </>
  )
}

export default App
