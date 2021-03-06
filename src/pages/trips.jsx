import { useEffect, useState } from "react"
import { TripCard } from "../cmps/trip-card"
import { reservationService } from "../services/reservation.service"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"
import { NavLink } from "react-router-dom"
import hand from '../assets/imgs/hand.svg';

export const Trips = () => {
    let loggedinUser = userService.getLoggedinUser()
   

    const [trips, setTrips] = useState(null)
    useEffect(() => {
        document.documentElement.style.setProperty('--headerFontColor', '#000');
        document.documentElement.style.setProperty('--headerbackgroundColor', '#F7F7F7');
        getTrips(loggedinUser)
    }, [])

    const getTrips = async (loggedinUser) => {
        const trips = await reservationService.query({ userId: loggedinUser._id })
        const sortedTrips = trips.sort((a, b) => Date.parse(a.checkIn) - Date.parse(b.checkIn))
        setTrips(sortedTrips)
    }
    if (!trips) return <div className="loader"></div>

    return (
        <section className="trips stock-margin">
            <div className="stock-margin-center">
                <div className="flex">
                    <li>
                        <img className="user-name-img" src={loggedinUser.imgUrl} alt="" />
                    </li>
                    <li>
                        <h1>
                            Hello {utilService.capitalizeFirst(loggedinUser.fullName)}
                        </h1>
                    </li>
                </div>
                <section className="trips-search-card">
                    <div className="left-side-trip">
                    <img src={hand} />
                    <div>
                        <h3>Looking for the next place to visit?</h3>
                        <h4>time to dust off your bags and start planning your next adventure</h4>
                    </div>
                        <NavLink to='/explore'><button style={{ width: '200px' }} className="reserve-button">explore for more</button></NavLink>
                    </div>
                    <div className="right-side-trip ">
                        
                    </div>
                </section>
                <h2 style={{ marginBottom: '2rem' }}>Your trips</h2>

                <section className="trip-cards-container">
                    {trips.map(trip => <TripCard trip={trip} key={trip._id} />)}
                </section>
            </div>

        </section>
    )

}


