import React from 'react'

export default function Carousel() {
    return (
        <div className="carousel slide" data-ride="carousel" id="carousel-1">
            <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                    <img
                        className="w-100 d-block"
                        src="https://images.pexels.com/photos/7102/notes-macbook-study-conference.jpg"
                        alt="Slide1"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        className="w-100 d-block"
                        src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg"
                        alt="Slide2"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        className="w-100 d-block"
                        src="https://images.pexels.com/photos/4474032/pexels-photo-4474032.jpeg"
                        alt="Slide3"
                    />
                </div>
            </div>
            <div>
                <a
                    className="carousel-control-prev"
                    href="#carousel-1"
                    role="button"
                    data-slide="prev"
                >
                    <span className="carousel-control-prev-icon" />
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#carousel-1"
                    role="button"
                    data-slide="next"
                >
                    <span className="carousel-control-next-icon" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <ol className="carousel-indicators">
                <li data-target="#carousel-1" data-slide-to={0} className="active" />
                <li data-target="#carousel-1" data-slide-to={1} />
                <li data-target="#carousel-1" data-slide-to={2} />
            </ol>
        </div>

    )
}
