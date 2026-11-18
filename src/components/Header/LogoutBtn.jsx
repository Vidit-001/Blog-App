import { useDispatch } from "react-redux";
import  {Logout} from "../../store/authslice" 
import {LogoutAccount} from "../../appwrite/auth"
function LogoutBtn() {
    const disptach = useDispatch()
    const LogoutHandler = () =>{ 
        LogoutAccount().
        then(() => {
            disptach(Logout())
        })
        .catch(() => {
            console.log("LogoutBtn:Components:Header")
        })
    }
    return (<>
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={LogoutHandler}
    >
        Logout</button>
    </>);
}

export default LogoutBtn;