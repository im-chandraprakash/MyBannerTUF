import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import BannerForm from "../../components/BannerForm/BannerForm";
import "./Dashboard.scss";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import { GetBannerAPI } from "../../../services/bannerApi";
import DashboardButton from "../../components/DashboardButton/DashboardButton";
import EmptyBanner from "../../components/EmptyBanner/EmptyBanner";

const Dashboard = () => {
    const [banner, setBanner] = useState(null);
    const [bannerId, setBannerId] = useState(null);

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
        <div className="dashboard">
            <div className="dashboard-banner">
                <div>
                    {banner ? <Banner banner={banner} /> : <EmptyBanner />}
                </div>
                {banner ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <h1
                            className="sub-heading"
                            style={{ color: "#4285F4", marginBlock: "30px" }}
                        >
                            Stop Banner Appearing :
                        </h1>
                        <div>
                            <ToggleButton
                                bannerId={null}
                            />
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="banner-info-edit">
                    <div className="banner-form">
                        <BannerForm banner={banner} />
                    </div>
                </div>
                <div>
                    <DashboardButton Name={"Go to Home"} url={"/"} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
