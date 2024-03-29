import { useState } from "react"
import { SmallFilter } from "./small-filter"
import { UserMsg } from "./user-msg"


export const AppHeaderMobile = () => {

    const [modalIsOpen, setModalIsOpen] = useState({ display: 'none' })


    const openSearchDropDown = () => {
        setModalIsOpen({ display: 'block' })
    }

    return (
        <header id="main-header" className="stock-margin main-header mobile-header">
            <div className="left"></div>
            <div className="stock-margin-center flex-col">
                <nav className="grid-3-col main-nav">
                    <div onClick={openSearchDropDown} className="explore-filterr filterr small">
                        <SmallFilter />
                    </div>
                    <div style={modalIsOpen} className="search-drop-down">
                    </div>
                </nav>
                <UserMsg />
            </div>
            <div className="right"></div>
        </header >
    )
}