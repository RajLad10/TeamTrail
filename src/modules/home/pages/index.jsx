import { Fragment } from "react"
import { useDispatch } from "react-redux"
import { dummy, logout } from "../../../store/authSlice";
import { decryptReactData } from "../../../constant";
import Sidebar from "../../../layout/Sidebar";

const Home = () => {
  const dispatch = useDispatch();

  

  const handleDummy = () => {
    dispatch(dummy());
  }

  const handleDec = () => {
    let dec = decryptReactData("U2FsdGVkX19IirOJOz8E9KwVOBrXaLejlbR18n08WIsfU0REtmiCeyXCM0m3S6UWmpLA1bYGZEft+T+d73kqPQ==", import.meta.env.VITE_ENCRYPTION_DECRYPTION_KEY);
    console.log("dec", dec);
  }
  return (
    <Fragment>
      Dashboard
    </Fragment>
  )
}

export default Home