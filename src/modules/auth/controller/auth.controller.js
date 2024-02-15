import userModel from "../../../../DB/models/User.model.js";
import sendEmail from "../../../utils/email.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { customAlphabet } from "nanoid";
import {
  generateToken,
  verifyToken,
} from "../../../utils/generteAndVerfiyToken.js";
import {
  comparePassword,
  hashPassword,
} from "../../../utils/hashAndCompare.js";
import { hash } from "bcrypt";

//1-نستلم data
//2-check if email exist -->
//3-create token & refresh token and links
//4-send Email
//5-hash password
//6-create user

export const signUp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  //check if email exist
  if (await userModel.findOne({ email })) {
    return next(new Error("Email is Already Found", { cause: 409 }));
  }
  //create token & links
  const token = generateToken({
    payload: { email },
    signature: process.env.SIGNUP_TOKEN_SIGNATURE,
    expiresIn: 60 * 30,
  });

  const rf_token = generateToken({
    payload: { email },
    signature: process.env.SIGNUP_TOKEN_SIGNATURE,
    expiresIn: 60 * 30,
  });

  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const rf_link = `${req.protocol}://${req.headers.host}/auth/refreshEmail/${rf_token}`;

  //send Email
  const html = `
  <a href=${link}>Confirm Email</a>
  <br><br>
  <a href=${rf_link}>Refresh Email</a>
  `;
  if (!sendEmail({ to: email, subject: "confirm Email", html })) {
    return next(new Error("Invaild Email", { cause: 404 }));
  }
  // console.log("asfasffasf");
  // //hash password

  req.body.password = hashPassword({ plaintext: req.body.password });

  //create user
  const user = await userModel.create(req.body);
  return res.status(200).json({ message: "done", user });
});

//1-get token from params
//2-verify token
//3-check email is exist
//4-check if email confirmed
//5-update user

export const confirmEmail = asyncHandler(async (req, res, next) => {
  //get token from params
  const { token } = req.params;

  //verify token
  const { email } = verifyToken({
    token,
    signature: process.env.SIGNUP_TOKEN_SIGNATURE,
  });

  if (!email) {
    return res.redirect("https://web.whatsapp.com/"); //Sign up
  }

  //check email is exist
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.redirect("https://web.whatsapp.com/"); //Sign up
  }

  //check if email confirmed
  if (user.confirmEmail) {
    return res.redirect("https://www.youtube.com/");
  }
  //update user
  await userModel.updateOne({ email }, { confirmEmail: true });
  return res.redirect("https://www.youtube.com/");
});

//refreshEmail
export const refreshEmail = asyncHandler(async (req, res, next) => {
  //verify token
  const { email } = verifyToken({
    token,
    signature: process.env.SIGNUP_TOKEN_SIGNATURE,
  });

  if (!email) {
    return res.redirect("https://web.whatsapp.com/"); //Sign up page
  }

  //check email is exist
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.redirect("https://web.whatsapp.com/"); //Sign up page
  }

  //check if email confirmed
  if (user.confirmEmail) {
    return res.redirect("https://www.youtube.com/"); //login page
  }

  //make token
  const newToken = generateToken({
    payload: { email },
    signature: process.env.SIGNUP_TOKEN_SIGNATURE,
    expiresIn: 60 * 10,
  });

  //link
  const newLink = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`;

  //send Email
  const html = `
    <a href=${newLink}>Confirm Email</a>
  `;
  if (!sendEmail({ to: email, subject: "confirm Email", html })) {
    return next(new Error("Invaild Email", { cause: 404 }));
  }
  return res.send(`<h1>Confirm Email</h1>`);
});

//logIn
export const logIn = asyncHandler(async (req, res, next) => {
  //get email and password
  const { email, password } = req.body;

  //email exist
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("Email Or Password Incorrect", { cause: 400 }));
  }
  //check if email confirmed
  if (!user.confirmEmail) {
    return next(new Error("Please Confirm Email First", { cause: 400 }));
  }

  //compare password
  const compare = comparePassword({
    plaintext: password,
    hashValue: user.password,
  });
  if (!compare) {
    return next(new Error("Email Or Password Incorrect", { cause: 400 }));
  }

  //generate token and refresh token
  const token = generateToken({
    payload: { email, _id: user._id },
    signature: process.env.TOKEN_SIGNATURE,
    expiresIn: 60 * 30,
  });

  const rf_token = generateToken({
    payload: { email, _id: user._id },
    signature: process.env.TOKEN_SIGNATURE,
    expiresIn: 60 * 60 * 24 * 30,
  });
  //update status to online
  const updateUser = await userModel.updateOne({ email }, { status: "Online" });
  return res.json({ message: "Done", token, rf_token });
});


//forgetPassword
export const sendCode=asyncHandler(
  async (req,res,next)=>{
    //get email
    const {email}=req.body

    //check if user exist
    const user=await userModel.findOne({email})
    if(!user){
      return next (new Error("User Not Exist",{cause:404}))
    }

    //check if user confirmed
    if(!user.confirmEmail){
      return next (new Error("Please Confirm Email",{cause:400}))
    }

    //create code
    const nanoid=customAlphabet('0123456789',5)
    const code=nanoid()

    //send Email
    if(!sendEmail({to:email,subject:"Forget Password",html:`<p>${code}</p>`})){
      return next (new Error("Failed To Send Email",{cause:400}))
    }

    //Update Code
    await userModel.updateOne({email},{code})
    return res.status(200).json({message:"Check your Email"})

    
  }
)

export const forgetPassword=asyncHandler(
  async(req,res,next)=>{
    //get email and Code
  const {email}=req.params
  const {code,password}=req.body
//check if user exist
const user=await userModel.findOne({email})

if(!user){
  return next (new Error("User Not Exist",{cause:404}))
}

//check code
if(code != user.code){
  return next (new Error("Invaild Code",{cause:400}))
}


const newPassword=hashPassword({plaintext:password})
await userModel.updateOne({email},{ password:newPassword, code:null, status: "Offline"})
return res.status(200).json({message:"Done"})


  }
)
