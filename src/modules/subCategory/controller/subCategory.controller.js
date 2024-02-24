import slugify from "slugify";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import subCategoryModel from "../../../../DB/models/SubCategory.model.js";
import categoryModel from "../../../../DB/models/Category.model.js";


//Create subCategory
export const createSubCategory =asyncHandler(
  async (req, res, next) => {
    const { name } = req.body;
    const {categoryId}=req.params
    
    
    if(!await categoryModel.findById({_id:categoryId})){
        return next(new Error("Category Not Found",{cause:404}))
    }
    
  
    if (await subCategoryModel.findOne({ name })) {
      return next(new Error("Name Already Exist",{cause:409}))
      
    }
  
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/Category/${categoryId}/subCategory` }
    );
    if (!secure_url) {
      return next(new Error("Iamge Not Found", { cause: 400 }));
    }
    req.body.Image = { secure_url, public_id };
    req.body.slug = slugify(name);
    req.body.categoryId=categoryId
    req.body.createdBy=req.user._id
  
    const createSubCategory = await subCategoryModel.create(req.body);
    return res.status(201).json({ message: "Done",createSubCategory });
  }
)

//Get All subCategory
export const getAllSubCategories = asyncHandler(
  async (req, res, next) => {
    const {categoryId}=req.params
    const allSubCateogry = await subCategoryModel.find({categoryId}).populate([{
      path:"categoryId",
    }])
    return res.status(200).json({ message: "Done", allSubCateogry });
  }
)

//Get One Category
export const getSubCategory = asyncHandler(
  async (req, res, next) => {
    const { subCategoryId } = req.params;
    const subCategory = await subCategoryModel.findById({ _id:subCategoryId }).populate([{
      path:'categoryId'
    }])
    if (!subCategory) {
      return next(new Error("subCategory No Found",{cause:404}))
    }
    return res.status(200).json({ message: "Done", subCategory });
  }
)


// Update Category
export const updateSubCategory = asyncHandler(
  async (req, res, next) => {
    const { subCategoryId } = req.params;
    const subCategory = await subCategoryModel.findById({ _id: subCategoryId });
    if (!subCategory) {
      return next(new Error("subCategory No Found",{cause:404}))
    }
  
    if (req.body.name) {
      if (await subCategoryModel.findOne({ name: req.body.name })) {
        return next(new Error("Name Already Exist",{cause:409}))
      }
      req.body.slug = slugify(req.body.name);
    }
  
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `${process.env.APP_NAME}/Category/${req.params.categoryId}/subCategory` }
      );
      if (!secure_url) {
        return next(new Error("Iamge Not Found", { cause: 400 }));
      }
      req.body.Image = { secure_url, public_id };
      await cloudinary.uploader.destroy(subCategory.Image.public_id);
    }

    req.body.updatedBy=req.user._id
    const updatedSubCategory = await subCategoryModel.findOneAndUpdate(
      { _id: subCategoryId },
      req.body,
      { new: true }
    );
    return res.status(200).json({ message: "Done", Subcategory:updatedSubCategory });
  }
)



//delete subCategory
export const deleteSubcategory=asyncHandler(
  async (req,res,next)=>{
      
      const {subCategoryId}=req.params
      const subCategory=await subCategoryModel.findOne({_id:subCategoryId})
      if(!subCategory){
          return next(new Error("subCategory Not Found",{cause:404}));
      }


      const deletesubCategory = await subCategoryModel.findOneAndDelete({_id:subCategoryId})
      return res.status(200).json({message:"Done"})

  }
)