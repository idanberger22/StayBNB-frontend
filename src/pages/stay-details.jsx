import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { useParams } from "react-router-dom"
import { DetailsGallery } from "../cmps/details-gallery"
import { ReserveStay } from "../cmps/reserve-stay"
import { StaydetailsHeader } from "../cmps/StaydetailsHeader"
import { StayDeatailsBellow } from "../cmps/stay-deatails-bellow"
import { ReviewLine } from "../cmps/review-line"
import { MapCmp } from "../cmps/map-cmp"

export const StayDetails = () => {

    const [stay, setStay] = useState(null)
    const { stayId } = useParams();

    useEffect(() => {
        getStay()
        document.documentElement.style.setProperty('--headerFontColor', '#000');
        document.documentElement.style.setProperty('--headerbackgroundColor', '#F7F7F7');
        var myElement = document.getElementById("main-header");
        myElement.classList.add("stock-margin-narrow");
        myElement.classList.remove("stock-margin");
        var myElement1 = document.getElementById("main-footer");
        myElement1.classList.add("stock-margin-narrow");
        myElement1.classList.remove("stock-margin");

        return () => {
            myElement.classList.remove("stock-margin-narrow");
            myElement.classList.add("stock-margin");
            myElement1.classList.remove("stock-margin-narrow");
            myElement1.classList.add("stock-margin");
        }

    }, [])

    const getStay = async () => {
        const stay = await stayService.getById(stayId)
        setStay(stay)
    }

    const showReserveCmp = () => {
        document.documentElement.style.setProperty('--ResVisible', 'block');


    }

    if (!stay) return <div className="loader"></div>

    return <div className="stock-margin-narrow main-stay-details-container">
        <div className="stock-margin-center details-container">
            <StaydetailsHeader stay={stay} />
            <DetailsGallery stay={stay} />
            <div className="stay-bellow-container">
                <div className="features-container">
                    <StayDeatailsBellow stay={stay} />
                </div>
                <div className="reserve-container">
                    <ReserveStay stay={stay} />
                </div>
            </div>
            <div className="line"></div>
            <h1>Reviews</h1>
            <section className="main-reviews">
                {stay.reviews.map(review =>
                    <ReviewLine review={review} key={review.txt} />
                )}
            </section>
            <section className="map">
                <MapCmp stay={stay} />
            </section>
            {/* <div className="flex reserve-container-mobile hidden-from-tablet2">
                <button onClick={showReserveCmp} className="reserve-button mobile-btn-reserve">Reserve</button>
            </div> */}
        </div>
    </div>
}