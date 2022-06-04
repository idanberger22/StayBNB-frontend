import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from "../store/actions/stay.action"
import { NavLink } from "react-router-dom"
import { DateRangeSelector } from "./date-picker"
import { ImgUploader } from "./img-uploader"
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"
import { stayService } from "../services/stay.service"


export const UploadStay = (props) => {

    var loggedinUser = userService.getLoggedinUser()

    const [newStay, setNewStay] = useState(
        {
            _id: utilService.makeId(),
            host: {
                _id: loggedinUser._id,
                fullname: loggedinUser.fullName,
                location: "Eureka, California, United States",
                about: "Adventurous couple loves to travel :)",
                responseTime: "within an hour",
                thumbnailUrl: loggedinUser.imgUrl,
                pictureUrl: loggedinUser.imgUrl,
                isSuperhost: true,
                id: utilService.makeId()
            }, imgUrls: [
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg',
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg',
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg',
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg',
                'https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg'
            ],
            amenities: [],
            address: {
                street: "Queens, NY, United States",
                country: "United States",
                city: 'tel aviv',
                countryCode: 'IL',
                location: {
                    lat: -73.88025,
                    lan: 40.74953,

                }
            }

            , reviewScores: { value: 5 },
            reviews: [
                {
                    at: "2016-10-14T04:00:00.000Z",
                    by: {
                        _id: "622f3406e36c59e6164fbaf7",
                        fullname: "Leonila",
                        imgUrl: "https://cdn.pixabay.com/photo/2017/10/05/11/47/smiling-face-2819150_960_720.jpg",
                        id: "95535426"
                    },
                    txt: "The experience is the first for me and I was say it's a good one. The couple is very friendly and it's. Very clean place, and you go in and out as you please. Only drawback, no parking like anywhere else."
                }]
        }
    )
    const [newAddress, setNewAddress] = useState(null)
    const [type, setType] = useState({ entire: true, hotel: true, private: true, shared: true });
    const [amenities, setAmenities] = useState('Wifi');







    useEffect(() => {
        console.log(newStay)
    }, [newStay])

    const onUploaded = (imgUrl, idx) => {
        const imgs = newStay.imgUrls
        imgs[idx] = imgUrl
        setNewStay({ ...newStay, imgUrls: imgs });
    }



    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        console.log('field', field)
        if (field === 'city' || field === 'country' || field === 'street' || field === 'country-code') {
            // const newAddress = newAddress.address
            // setNewAddress({ ...newAddress, [field]: value })
            setNewStay({ ...newStay, address: { ...newStay.address, [field]: value } })

        }
        else setNewStay({ ...newStay, [field]: value })


        console.log('newStay', newStay)
    }

    const handleEmnitiesChange = ({ target }) => {
        console.log('taget.name', target.name)
        const amenity = target.name
        if (newStay.amenities.includes(amenity)) {
            setNewStay({ ...newStay, amenities: newStay.amenities.filter(amn => amn !== amenity) })
        }
        else setNewStay({ ...newStay, amenities: [...newStay.amenities, amenity] })
        console.log('newStay', newStay)
    }

    const handleTypeChange = ({ target }) => {
        console.log('taget.name', target.value)
        const type = target.value

        setNewStay({ ...newStay, type: type })


    }

    const onClose = () => {
        console.log('im here in props')
        props.showUploadStayTogle()
    }











    const uploadStay = async () => {
        const stayToUpload = await stayService.addStay(newStay)
        if (stayToUpload) console.log('new stay has been added')
        else console.log('couldnt add a stay')
    }



    return (
        <div className="main-upload-stay">
            <h1>upload a stay to host</h1>
            <div onClick={onClose}>

            <span  class="material-icons">close</span>
            </div>
            
            <div className="container">
                <div className="details-form">


                    <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Property name" name="name" variant="outlined" />
                    <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Summary" name="summary" variant="outlined" />
                    <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Country" name="country" variant="outlined" />
                    <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="City" name="city" variant="outlined" />
                    <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Street" name="street" variant="outlined" />
                    <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Country code" name="country-code" variant="outlined" />
                    <TextField onChange={(ev) => handleChange(ev)} id="outlined-basic" label="Price per night" name="price" variant="outlined" />
                </div>
                <div className="checkboxes">

                    <h1>Amneties:</h1>

                    <div className="emnities">
                        <FormGroup>
                            <FormControlLabel onChange={(ev) => handleEmnitiesChange(ev)} control={<Checkbox />} name="TV" label="TV" />
                            <FormControlLabel onChange={(ev) => handleEmnitiesChange(ev)} control={<Checkbox />} name="Wifi" label="Wifi" />
                            <FormControlLabel onChange={(ev) => handleEmnitiesChange(ev)} control={<Checkbox />} name="Kitchen" label="Kitchen" />
                            <FormControlLabel onChange={(ev) => handleEmnitiesChange(ev)} control={<Checkbox />} name="Air conditioning" label="Air conditioning" />

                        </FormGroup>
                    </div>
                    <h1>Type of Place:</h1>
                    <div className="type">
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel onChange={(ev) => handleTypeChange(ev)} control={<Radio />} value="Entire home/apt" label="Entire home/apt" />
                                <FormControlLabel onChange={(ev) => handleTypeChange(ev)} control={<Radio />} value="Hotel room" label="Hotel room" />
                                <FormControlLabel onChange={(ev) => handleTypeChange(ev)} control={<Radio />} value="Private room" label="Private room" />
                                <FormControlLabel onChange={(ev) => handleTypeChange(ev)} control={<Radio />} value="Private room" label="Private room" />

                            </RadioGroup>
                        </FormControl>

                    </div>

                </div>
                <div className="img-upload-gallery">
                    <li><ImgUploader onUploaded={onUploaded} idx={1} /></li>
                    <li>
                        <ImgUploader onUploaded={onUploaded} idx={2} />
                    </li>
                    <li>
                        <ImgUploader onUploaded={onUploaded} idx={3} />
                    </li>
                    <li>
                        <ImgUploader onUploaded={onUploaded} idx={4} />
                    </li>
                    <li>
                        <ImgUploader onUploaded={onUploaded} idx={5} />
                    </li>
                </div>
                




            </div>

            <div className="upload-btn-container" >
            <button className="reserve-button" onClick={uploadStay} >upload</button>
            </div>




        </div>
    )
}