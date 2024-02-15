import slugify from "slugify";
import brandModel from "../../../../DB/models/Brand.model.js";
import categoryModel from "../../../../DB/models/Category.model.js";
import subCategoryModel from "../../../../DB/models/SubCategory.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { nanoid } from "nanoid";
import productModel from "../../../../DB/models/Product.model.js";
import cloudinary from "../../../utils/cloudinary.js";







export const createProduct=asyncHandler(
    async(req,res,next)=>{
        //1-get categoryId,SubcategoryId,brandId
        const {categoryId,subCategoryId,brandId,price}=req.body
        if (!await categoryModel.findById({_id:categoryId})) {
            return next(new Error("Category Not Found",{cause:404}))
            
          }

        if (!await subCategoryModel.findById({_id:subCategoryId})) {
            return next(new Error("brand Not Found",{cause:404}))
            
          }

        if (!await brandModel.findById({_id:brandId})) {
            return next(new Error("brand Not Found",{cause:404}))
            
          }
        //2-create slug
        req.body.slug=slugify(req.body.name,{
            lower:true,
            trim:true
        })

        //3-calculte final price -->price-((price*discount)/100)
        req.body.finalPrice=price-(price*req.body.discount)/100

        //4-create customId
        req.body.customId=nanoid()
        

        //5-upload mainImage
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.files.mainImage[0].path,
            { folder: `${process.env.APP_NAME}/Prouct/${req.body.customId}/mainImage` }
          );
          if (!secure_url) {
            return next(new Error("Iamge Not Found", { cause: 400 }));
          }
          req.body.mainImage = { secure_url, public_id };
          

          //6-check sub image
          // if(req.files.subImage?.length){
          //   let images=[]
          //   for (const image of req.files.subImages) {
              
          //       const { secure_url, public_id } = await cloudinary.uploader.upload(
          //           image.path,
          //           { folder: `${process.env.APP_NAME}/Prouct/${req.body.customId}/subImage` }
          //         );
          //         if (!secure_url) {
          //           return next(new Error("Iamge Not Found", { cause: 400 }));
          //         }
          //         images.push({ secure_url, public_id })
          //   }

          //   req.body.subImages = images;
            
          // }

          if(req.files?.subImages){
            req.body.subImages=[]
            for (const file of req.files.subImages) {
          
              const { secure_url, public_id } = await cloudinary.uploader.upload(
                file.path,
                { folder: `${process.env.APP_NAME}/Prouct/${req.body.customId}/subImage` }
              );
              
              if (!secure_url) {
                return next(new Error("Iamge Not Found", { cause: 400 }));
              }
              req.body.subImages.push({ secure_url, public_id })
            }
            
          }

          //7-add created by
          req.body.createdBy=req.user._id
          
          //8-Create category
          const product=await productModel.create(req.body)
          return res.status(201).json({message:"Done",product})
    }
)


export const updateProduct=asyncHandler(
  async(req,res,next)=>{

      //productId  
      const product=await productModel.findById({_id:req.params.productId})
      if(!product){
        return next(new Error("product not Found",{cause:404}))
      } 
    //subCategoryId-->if exist
      if (req.body.subCategoryId && !await subCategoryModel.findById({_id:req.body.subCategoryId})) {
          return next(new Error("subCategory Not Found",{cause:404}))
          
        }
     //brandId-->if exist
      if (req.body.brandId && !await brandModel.findById({_id:req.body.brandId})) {
          return next(new Error("brand Not Found",{cause:404}))
          
        }
 
      //name-->slug
        if (req.body.name){
          req.body.slug=slugify(req.body.name,{
            lower:true,
            trim:true
        })
        }

      //Update final price
      req.body.finalPrice= req.body.price-(req.body.price * req.body.discount )/100

      

      //Check mainImage
      if(req.files?.mainImage?.length){
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          req.files.mainImage[0].path,
          { folder: `${process.env.APP_NAME}/Prouct/${product.customId}/mainImage` }
        );
        if (!secure_url) {
          return next(new Error("Iamge Not Found", { cause: 400 }));
        }
        await cloudinary.uploader.destroy(product.mainImage.public_id)
        req.body.mainImage = { secure_url, public_id };

      }
      
        
       

      //Check subImages
        if(req.files?.subImages){
          req.body.subImages=[]
          for (const file of req.files.subImages) {
        
            const { secure_url, public_id } = await cloudinary.uploader.upload(
              file.path,
              { folder: `${process.env.APP_NAME}/Prouct/${product.customId}/subImage` }
            );
            
            if (!secure_url) {
              return next(new Error("Iamge Not Found", { cause: 400 }));
            }
            product.subImages.push({ secure_url, public_id })
          }
          req.body.subImages=product.subImages
          
        }

        //add updatedBy
        req.body.updatedBy=req.user._id
        
        //Update Product
        const update=await productModel.findByIdAndUpdate({_id:req.params.productId},req.body,{new:true})
        return res.status(200).json({message:"Done",update})
  }
)


export const getProducts=asyncHandler(
  async(req,res,next)=>{
    const products=await productModel.find({})
    return res.status(200).json({message:"Done",products})
  }
)


export const getOneProducts=asyncHandler(
  async(req,res,next)=>{
    const {productId}=req.params
    const product=await productModel.findById({_id:productId})
    return res.status(200).json({message:"Done",product})
  }
)









  //6-check sub image
        // if(req.files.subImage?.length){
        //   let images=[]
        //   for (const image of req.files.subImages) {
            
        //       const { secure_url, public_id } = await cloudinary.uploader.upload(
        //           image.path,
        //           { folder: `${process.env.APP_NAME}/Prouct/${req.body.customId}/subImage` }
        //         );
        //         if (!secure_url) {
        //           return next(new Error("Iamge Not Found", { cause: 400 }));
        //         }
        //         images.push({ secure_url, public_id })
        //   }

        //   req.body.subImages = images;
          
        // }