import React from "react";
import img from "../../assets/emptyImg.jpg";
import './EmptyBanner.scss'
function EmptyBanner() {
    return (
        <div className="container-empty">
            <div className="empty-container">
                <div className="img-div">
                    <img src={img} alt="This is Image" />
                </div>

                <div className="div-msg">
                    <h1 className="heading">
                        There is No Banner as of now
                    </h1>
                    <p className="subheading" style={{color: '#8800c7', marginBottom :'10px', textAlign : 'center'}}>please go to dashboard and insert valid one</p>
                </div>
            </div>
        </div>
    );
}

export default EmptyBanner;
