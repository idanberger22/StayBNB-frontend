import { useEffect, useState } from "react"
import { HomeImgCard } from "../cmps/home-img-card"
import { stayService } from "../services/stay.service"
import { useDispatch } from 'react-redux'
import { showLargeFilter, showSmallFilter, LogoChangeToWhite } from "../store/actions/headerAction"
import { changeFilter } from "../store/actions/stay.action"
import { NavLink } from "react-router-dom"
import { utilService } from "../services/util.service"


export const Home = () => {
    const [topRated, setTopRated] = useState(null)
    const cities = [{ name: 'New york', imgURL: 'https://a.cdn-hotels.com/gdcs/production101/d154/ee893f00-c31d-11e8-9739-0242ac110006.jpg' },
    { name: 'Porto', imgURL: 'https://touristjourney.com/wp-content/uploads/2020/10/shutterstock_1706807566-scaled.jpg' },
    { name: 'Montreal', imgURL: 'https://www.airtransat.com/getmedia/cafc7e6e-d0ff-497e-9998-e708f41aa191/Montreal-estival.aspx' },
    { name: 'Barcelona', imgURL: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_770,w_1000,x_0,y_0/c_limit,f_auto,fl_lossy,q_80,w_1080/shutterstock_174454670_gicbgy.jpg' }]

    useEffect(() => {
        window.addEventListener('scroll', changeCss, { passive: true });
        getTopRated()
        dispatchLogoIsWhite()
        
        document.body.clientWidth < 640 ? dispatchFiltertoHide() : dispatchFiltertoShow()
        document.documentElement.style.setProperty('--headerbackgroundColor', 'unset');
        document.documentElement.style.setProperty('--headerFontColor', '#F7F7F7');
        document.documentElement.style.setProperty('--verylightgray', 'unset');
        document.documentElement.style.setProperty('--bgc', 'unset');
        
        return () => {
            window.removeEventListener('scroll', changeCss, { passive: true });
            document.documentElement.style.setProperty('--bgc', '#F7F7F7');
            document.documentElement.style.setProperty('--verylightgray', '#ECECEC');
            document.documentElement.style.setProperty('--headerFontColor', '#F7F7F7');
            dispatchFiltertoHide()
            dispatch(LogoChangeToWhite(false))
        }
    }, [])

    const changeCss = () => {
        const scrollValue = document.documentElement.scrollTop

        if (scrollValue > 700) {
            dispatch(LogoChangeToWhite(false))
        }
        else if (scrollValue <= 700) {
            dispatch(LogoChangeToWhite(true))
        }
    }

    const dispatch = useDispatch()

    const dispatchFiltertoShow = () => {
        dispatch(showLargeFilter())
    }
    const dispatchFiltertoHide = () => {
        dispatch(showSmallFilter())
    }
    const dispatchLogoIsWhite = () => {
        dispatch(LogoChangeToWhite(true))
    }

    const getTopRated = () => {
        const topStays = stayService.getTopRated()
        setTopRated([topStays])
    }

    const moveToRandom = () =>{
        const idx = utilService.getRandomIntInclusive(0,3)
        dispatch(changeFilter({ location: cities[idx].name, from: null, to: null }))
    }

    { if (!topRated) return (<h1></h1>) }

    return (
        <article className="home-page-container" >
            <section className="main-page-head">
                <div className="hero">
                    <h1>
                        Not sure where to go? Perfect.
                    </h1>
                    <div>
                        <button>
                            <NavLink onClick={moveToRandom} className='undecorate' to={`/explore`}>
                                <h3 className="font-bold">
                                    I'm flexible
                                </h3>
                            </NavLink>
                        </button>
                    </div>
                </div>

            </section>
            <section className="stock-margin">
                <div className="stock-margin-center home-page-card-container ">
                    <h1>Popular destinations</h1>
                    <div className="home-page-card-line">
                        {cities.map(city =>
                            <HomeImgCard city={city} key={city.name} />
                        )}
                    </div>
                    <h1>Top rated</h1>
                    <div className="home-page-card-line" >
                        {topRated[0].map(stay =>
                            <HomeImgCard stay={stay} key={stay._id} />
                        )}
                    </div>
                </div>
            </section>
            <div className="become-a-host">
                <div>
                    <h1>Become a host</h1>
                    <NavLink to='/host'><button className="reserve-button">Learn more</button></NavLink>
                </div>
            </div>
        </article>
    )
}


