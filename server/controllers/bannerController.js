const { uploadImageToCloudinary } = require("../utils/ImageUpload");
const { Banner } = require("../models/banner"); // Ensure Banner is a Sequelize model

// Fetch all active banners
// Fetch all active banners
exports.getActiveBanner = async (req, res) => {
    try {
        const activeBanners = await Banner.findAll({ where: {} });
        console.log("Get the datas ",activeBanners)
        if (activeBanners.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No active banners found"
            });
        }
        res.status(200).json({
            success: true,
            banners: activeBanners
        });
    } catch (error) {
        console.error("Error fetching active banners:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch active banners",
            error: error.message
        });
    }
};


// Update banner information
exports.updateBannerInfo = async (req, res) => {
    try {
        // Retrieve existing banners to delete their images from Cloudinary
        const existingBanners = await Banner.findAll();
        for (const banner of existingBanners) {
            if (banner.cloudinaryPublicId) {
                // await cloudinary.uploader.destroy(banner.cloudinaryPublicId);
                console.log(`Deleted image with public ID: ${banner.cloudinaryPublicId}`);
            }
        }

        // Delete all existing banners from database
        await Banner.destroy({ where: {} });
        console.log("Deleted all existing banners");
        
        const updates = {};
        
        if (req.body.heading) updates.heading = req.body.heading;
        if (req.body.subheading) updates.subheading = req.body.subheading;
        if (req.body.description) updates.description = req.body.description;
        if (req.body.countdownTimer) updates.countdownTimer = req.body.countdownTimer;
        if (req.body.link) updates.link = req.body.link;
        
        if (req.file) {
            const bannerImage = req.file;
            const uploadedImg = await uploadImageToCloudinary(bannerImage.path); // Ensure .path is used correctly
            updates.bannerImage = uploadedImg.url;
            updates.cloudinaryPublicId = uploadedImg.public_id; // Store public_id
        }
        
        const updatedBanner = await Banner.create({
            ...updates,
            isAlive: true // Mark as alive
        });
        
        res.status(200).json({
            success: true,
            message: "Banner updated successfully",
            banner: updatedBanner
        });
        
    } catch (error) {
        console.error("Error updating banner:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update banner",
            error: error.message
        });
    }
};


// Make a banner live by ID
exports.makeBannerLiveById = async (req, res) => {
    try {
        const { bannerId } = req.body;
        const [affectedRows] = await Banner.update({ isAlive: false }, { where: { id } });
        
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }
        
        res.status(200).json({ success: true, message: "Banner is not Active" });
    } catch (error) {
        console.error("Error making banner live:", error);
        res.status(500).json({ success: false, message: "Failed to make banner live", error: error.message });
    }
};

// Insert a new banner
exports.insertBanner = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request file:", req.files); // Debugging

        const existingBanners = await Banner.findAll();
        for (const banner of existingBanners) {
            if (banner.cloudinaryPublicId) {
                await cloudinary.uploader.destroy(banner.cloudinaryPublicId);
                console.log(`Deleted image with public ID: ${banner.cloudinaryPublicId}`);
            }
        }

        await Banner.destroy({ where: {} });
        console.log("Deleted all existing banners");
        
        const {
            heading,
            subheading,
            description,
            countdownTimer,
            link,
        } = req.body;

        const bannerImage = req.files?.bannerImage; // Access file from req.files
        let bannerImageUrl = null;
        let cloudinaryPublicId = null;

        if (bannerImage) {
            console.log("Banner image file path:", bannerImage.tempFilePath); // Debugging
            
            // Use .mv() method to save file to a temporary location
            const tempPath = `tmp/${bannerImage.name}`;
            await bannerImage.mv(tempPath);
            
            const uploadedImg = await uploadImageToCloudinary(tempPath, 'MyBanner'); // Use file path for upload
            bannerImageUrl = uploadedImg.secure_url; // Use secure_url for HTTPS
            cloudinaryPublicId = uploadedImg.public_id;

            // Optionally delete the temporary file after upload
            require('fs').unlinkSync(tempPath);
        } else {
            console.log("No banner image received."); // Debugging
        }

        await Banner.create({
            heading,
            subheading,
            description,
            bannerImage: bannerImageUrl,
            countdownTimer,
            link,
            isAlive: true, // Default or initial state
            cloudinaryPublicId // Store Cloudinary public ID
        });

        res.status(201).json({
            success: true,
            message: "Banner inserted successfully"
        });
    } catch (error) {
        console.error("Error inserting banner:", error);
        res.status(500).json({
            success: false,
            message: "Failed to insert banner",
            error: error.message,
            stack: error.stack // Include stack trace in response for debugging
        });
    }
};