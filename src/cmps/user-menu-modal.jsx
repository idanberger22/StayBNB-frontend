import { NavLink } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { openModal, logOut } from "../store/actions/userActions"
import { userService } from "../services/user.service"

export const UserMenuModal = (props) => {

    const dispatch = useDispatch()
    const loggedinUser = userService.getLoggedinUser()
    let isMobile = document.body.clientWidth < 640 ? true : false

    const toggleModal = (isLogin) => {
        dispatch(openModal(isLogin))
        closeSelf()
    }

    const closeSelf = () => {
        props.toggleModal()
    }

    const onLogout = async () => {
        dispatch(logOut())
        props.removeOnLogout()
        closeSelf()
    }

    return (<section onClick={closeSelf} className="user-menu-container">
        {!loggedinUser && <><li onClick={() => toggleModal(false)} className="clickable noselect">
            <a className='undecorate'>Sign up</a>
        </li>
            <li onClick={() => toggleModal(true)} className="clickable noselect">
                <a className='undecorate'>Log in</a>
            </li></>}

        {loggedinUser &&
            <>
                <li>
                    <NavLink className='undecorate' to='/trips' >Trips</NavLink>
                </li>
                {isMobile && <li>
                    <NavLink className='undecorate' onClick={closeSelf} to='/host' >Host dashboard</NavLink>
                </li>}  
                <li>
                    <NavLink className='undecorate' onClick={closeSelf} to='/host-your-home' >Host your home</NavLink>
                </li>
                <li>
                    <NavLink onClick={onLogout} className='undecorate' to='/home'>Log out</NavLink>
                </li>
            </>
        }
    </section>
    )
}