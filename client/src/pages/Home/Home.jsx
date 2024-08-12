import React, { useEffect, useState } from "react";
import "./Home.scss";
import Banner from "../../components/Banner/Banner";
import DashboardButton from "../../components/DashboardButton/DashboardButton";
import EmptyBanner from "../../components/EmptyBanner/EmptyBanner";
import { GetBannerAPI } from "../../../services/bannerApi";

function Home() {
    const [banner, setBanner] = useState(null);

    const fetchBanner = async () => {
        try {
            const result = await GetBannerAPI();

            if (result.length != 0) {
                setBanner(result[0]);
            }
        } catch (error) {
            console.error("Error fetching banner data:", error);
        }
    };

    useEffect(() => {
        fetchBanner();
        console.log("Banner is : ", banner);
    }, []);

    return (
        <div className="Home-page">
            <div className="home-banner">
                {banner ? <Banner banner={banner} />: <EmptyBanner />}
                
            </div>
            <div className="home-dashboard">
                <DashboardButton Name={"Dashboard"} url={"/dashboard"} />
            </div>
        </div>
    );
}

export default Home;
