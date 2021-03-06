import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from "../store/actions/stay.action"
import { NavLink } from "react-router-dom"
import { DateRangeSelector } from "./date-picker"

export const MainFilter = () => {

    const dispatch = useDispatch()
    const [filterBy, setFilterBy] = useState({ location: '', from: null, to: null })
    const loadedFilter = useSelector((storeState) => storeState.stayModule.filterBy)

    useEffect(() => {
        if (filterBy.location !== loadedFilter.location ||
            filterBy.from !== loadedFilter.from ||
            filterBy.to !== loadedFilter.to) setFilterBy(loadedFilter)
    }, [loadedFilter])

    const dispatchFilter = () => {
        dispatch(changeFilter(filterBy))
    }

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        setFilterBy({ ...filterBy, [field]: value })
    }

    const handleDate = (dates) => {
        if (dates.startDate) setFilterBy({ ...filterBy, from: dates.startDate })
        if (dates.endDate) setFilterBy({ ...filterBy, to: dates.endDate })
    }

    return (
        <div className="total-filter">
            
            <div className="inpt-fillter">
                <div className="center" style={{ alignItems: 'flex-start' }}>
                    <label htmlFor='main-input' className="main-filter-label font-bold clickable">Where</label>
                    <input name="location" value={filterBy.location} type="text" placeholder="Search destination" onChange={handleChange} autoComplete='off' id='main-input' />
                </div>
            </div>


            <div className="inpt-fillter" style={{ position: 'relative' }}>
                <div className="center">
                    <div className="filter-labels-holder">
                        <label className="main-filter-label font-bold clickable">Check in</label>
                        <label className="main-filter-label font-bold clickable">Check out</label>
                    </div>
                    <DateRangeSelector place={'filter'} handleDate={handleDate} startDate={loadedFilter.from} endDate={loadedFilter.to} />
                </div>
            </div>


            <NavLink className="navlink" to='/explore'>
                <div onClick={dispatchFilter}>
                    <div className="inpt-fillter search-symbol hidden-from-mobile">
                        <span className="material-symbols-sharp white ">search</span>
                    </div>
                    <div className="serch-btn hidden-from-tablet2">
                        <button className="reserve-button">Search</button>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}