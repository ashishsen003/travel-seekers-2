import Review from "../models/Review.js"
import Tour from "../models/Tour.js"

export const createReview = async(req, res)=>{
    const tourId = req.params.tourId
    const newReview = new Review({...req.body})
    console.log(req.body);
    try {
        if(!req.body.null){
            return res.status(404).json({success: false, message: 'please choose star'})
        }
        const savedReview = await newReview.save()

        await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews: savedReview._id}
        })
        res.status(200).json({success: true, message: 'Review submitted', data: savedReview})
    } catch (error) {
        res.status(500).json({success: false, message: 'failed to submit'})
        
    }
}