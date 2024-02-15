import categoryModel from "../../../../DB/models/Category.model.js";
import slugify from "slugify";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


//Create Category
export const createCategory =asyncHandler(
  async (req, res, next) => {
    const { name } = req.body;


  
    if (await categoryModel.findOne({ name })) {
      return next(new Error("Name Already Exist",{cause:409}))
      
    }
  
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/Cateory` }
    );
    if (!secure_url) {
      return next(new Error("Iamge Not Found", { cause: 400 }));
    }
    req.body.Image = { secure_url, public_id };
  
    req.body.slug = slugify(name);

    req.body.createdBy=req.user._id
    
  
    const createCategory = await categoryModel.create(req.body);
    return res.status(201).json({ message: "Done", createCategory });
  }
)

//Get All Category
export const getAllCategories = asyncHandler(
  async (req, res, next) => {
    const allCateogry = await categoryModel.find().populate([
      {
        path:'subCategory'
      }
    ])
    return res.status(200).json({ message: "Done", allCateogry })
  }
)

//Get One Category
export const getOneCategory = asyncHandler(
  async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await categoryModel.findById({ _id: categoryId }).populate([
      {
        path:'subCategory'
      }
    ])
    if (!category) {
      return next(new Error("Category No Found",{cause:404}))
    }
    return res.status(200).json({ message: "Done", category });
  }
)

//Update Category
export const updateCategory = asyncHandler(
  async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await categoryModel.findById({ _id: categoryId });
    if (!category) {
      return next(new Error("Category No Found",{cause:404}))
    }
    console.log(category);
  
    if (req.body.name) {
      if (await categoryModel.findOne({ name: req.body.name })) {
        return next(new Error("Name Already Exist",{cause:409}))
      }
      req.body.slug = slugify(req.body.name);
    }
  
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        { folder: `${process.env.APP_NAME}/Cateory` }
      );
      if (!secure_url) {
        return next(new Error("Iamge Not Found", { cause: 400 }));
      }
      req.body.Image = { secure_url, public_id };
      await cloudinary.uploader.destroy(category.Image.public_id);
    }

    req.body.updatedBy=req.user._id
    const updatedCategory = await categoryModel.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      { new: true }
    );
    return res.status(200).json({ message: "Done", updatedCategory });
  }
)
