import brandModel from "../../../../DB/models/Brand.model.js";
import slugify from "slugify";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


//Create Brand
export const createBrand =asyncHandler(
  async (req, res, next) => {
    const { name } = req.body;


  
    if (await brandModel.findOne({ name })) {
      return next(new Error("Name Already Exist",{cause:409}))
      
    }
  
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/Brand` }
    );
    if (!secure_url) {
      return next(new Error("Iamge Not Found", { cause: 400 }));
    }
    req.body.Image = { secure_url, public_id };
  
    req.body.slug = slugify(name);
    req.body.createdBy=req.user._id
  
    const createBrand = await brandModel.create(req.body);
    return res.status(201).json({ message: "Done", createBrand });
  }
)

//Get All Brand
export const getAllBrands = asyncHandler(
  async (req, res, next) => {
    const allBrands = await brandModel.find()
    return res.status(200).json({ message: "Done", allBrands })
  }
)

//Get One Category
export const getOneBrand = asyncHandler(
  async (req, res, next) => {
    const { brandId } = req.params;
    const brand = await brandModel.findById({ _id: brandId })
    if (!brand) {
      return next(new Error("Brand No Found",{cause:404}))
    }
    return res.status(200).json({ message: "Done", brand });
  }
)

//Update Brand
export const updateBrand = asyncHandler(
  async (req, res, next) => {
    const { brandId } = req.params;
    const brand = await brandModel.findById({ _id: brandId });
    if (!brand) {
      return next(new Error("Brand Not Found",{cause:404}))
    }
  
    if (req.body.name) {
      if (await brandModel.findOne({ name: req.body.name })) {
        return next(new Error("Name Already Exist",{cause:409}))
      }
      req.body.slug = slugify(req.body.name);
    }
  
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `${process.env.APP_NAME}/Brand` }
      );
      if (!secure_url) {
        return next(new Error("Iamge Not Found", { cause: 400 }));
      }
      req.body.Image = { secure_url, public_id };
      await cloudinary.uploader.destroy(brand.Image.public_id);
    }
    
    req.body.updatedBy=req.user._id
    const updatedBrand = await brandModel.findOneAndUpdate(
      { _id: brandId },
      req.body,
      { new: true }
    );
    return res.status(200).json({ message: "Done", updatedBrand });
  }
)


//delete Brand
export const deleteBrand=asyncHandler(
  async (req,res,next)=>{
      
      const {brandId}=req.params
      const brand=await brandModel.findOne({_id:brandId})
      if(!brand){
          return next(new Error("brand Not Found",{cause:404}));
      }


      const deletebrand = await brandModel.findOneAndDelete({_id:brandId})
      return res.status(200).json({message:"Done"})

  }
)