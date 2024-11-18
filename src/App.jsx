import { Toaster } from "react-hot-toast"
import Routes from "./routes"

function App() {

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
