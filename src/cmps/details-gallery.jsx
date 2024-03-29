import { useState } from "react"

export const DetailsGallery = ({ stay }) => {
    const [openImg, setOpenImg] = useState()
    const isMobile = document.body.clientWidth < 640 ? true : false

    const viewImage = (url) => {
        if (!isMobile) return
        setOpenImg(url)
    }

    return <section className="gallery-grid" >
        {stay.imgUrls.map(url => {
            let image = url ? <img key={url} src={url} onClick={() => viewImage(url)}></img> : <img src="https://res.cloudinary.com/dhy6ndeij/image/upload/v1654355077/yehorlisnyi210400016_hovpjv.jpg" ></img>
            return image
        })}
        {openImg && <>
            <div className="modal-blur" onClick={() => setOpenImg(false)}></div>
            <img className="img-modal" src={openImg}>  
            </img>
        </>}
    </section>

}