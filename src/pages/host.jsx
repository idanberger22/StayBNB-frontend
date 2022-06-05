
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { openModal } from "../store/actions/userActions"
import { ReservationPreview2 } from "../cmps/reservation2-preview"
import { UploadStay } from "../cmps/upload-stay"
import { reservationService } from "../services/reservation.service"
import { stayService } from "../services/stay.service"
import { userService } from "../services/user.service"
import { StayPreview } from "../cmps/stay-preview"


export const Host = () => {

    const [reservations, setreservations] = useState(null)
    const [uploadStyling, setUploadStyling] = useState(false)
    const [loggedInUser, setloggedInUser] = useState(userService.getLoggedinUser())
    const [hostStays, setHostStays] = useState(false)
    const dispatch = useDispatch()



    useEffect(() => {
        document.documentElement.style.setProperty('--headerFontColor', '#000');
        document.documentElement.style.setProperty('--headerbackgroundColor', '#F7F7F7');
        if (!loggedInUser) {
            dispatch(openModal(true))
        }
        else {
            getReservations()
            getStays()
        }

    }, [])

    const getStays = async () => {
        const stays = await stayService.getByHOstId(loggedInUser._id)
        setHostStays(stays)
    }
    const showUploadStayTogle = () => {
        setUploadStyling(!uploadStyling)
    }

    const getReservations = async () => {
        const reservatios = await reservationService.query({ hostId: loggedInUser._id })
        const sortedReservatios = reservatios.sort((a, b) => Date.parse(a.checkIn) - Date.parse(b.checkIn))
        setreservations(sortedReservatios)
    }

    if (!loggedInUser) return <h1>must be logged in</h1>
    if (!reservations) return <h1>you currently have no reservations</h1>
    if (!hostStays) return <h1>loading</h1>

    return (<div className="stock-margin main-host-page">

        <div className="stock-margin-center">
            <div className="flex">
                <li>
                    <img src={loggedInUser.imgUrl} alt="" />
                </li>
                <li>
                    <h1>
                        Hello {loggedInUser.fullName}!
                    </h1>
                </li>
            </div>
            {uploadStyling && <UploadStay getStays={getStays} showUploadStayTogle={showUploadStayTogle} />}
            {!uploadStyling && <div className="header">
                <button className="reserve-button" onClick={showUploadStayTogle}>Add a listing</button>


            </div>}
            {!uploadStyling &&<section >
                <div className="card-container" >
                    {hostStays.map(stay =>
                        <StayPreview stay={stay} key={stay._id} />
                        )}
                </div>
            </section>}

            {!uploadStyling &&<div>
                <div className="reservations-container">
                    <table className="reservations-table" >

                        <tr>
                            <th>Guest Name</th>
                            <th>Property</th>
                            <th>Guests qty</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Total price</th>
                            <th>Add a review</th>
                            <th>Cancel</th>
                        </tr>

                        {reservations.map(reservation =>
                            <tr>

                                <ReservationPreview2 getReservations={getReservations} reservation={reservation} key={reservation._id} />
                            </tr>
                        )}
                    </table>
                </div>
            </div>}
        </div>
    </div>
    )
}


