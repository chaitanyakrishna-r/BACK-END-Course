import { asnycHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudConfig.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { error } from "console";

//post register user
const registerUser = asnycHandler(async (req, res) => {
  // res.status(200).json({message: 'ok'})

  //data destructure from frontend
  const { username, fullName, email, password } = req.body;
  console.log(username, fullName, email, password);

  /*   validation

  basic version check each field like this
  if(fullName === ""){
      throw new ApiError(400,"FullName required",)
  }

  checking using map() method

  const hasEmptyfield = [username, fullName, email, password]
    .map((field) => {
      return field?.trim() === "";
    })
    .includes(true);

  if (hasEmptyfield) {
    throw new Error();
  }

  useing .some() better and fast for conition */

  if (
    [fullName, username, password, email].some((field) => {
      return !field || field.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields Required");
  }

  //checking validation for email
  if (!email.includes("@") || !email.includes(".")) {
    throw new ApiError(400, "Invalid email");
  }

  //checking user exists or
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User Already exists!");
  }

  const avatarLocalFilePath = req.files?.avatar?.[0]?.path;
  //   const coverImageLocalFilePath = req.files?.coverImage[0]?.path;// this doesn't wrong when req.files are undefined

  let coverImageLocalFilePath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalFilePath = req.files.coverImage[0].path;
  }

  if (!avatarLocalFilePath) {
    throw new ApiError(400, "avatar must be uploadeds");
  }

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);
  const coverImage = await uploadOnCloudinary(coverImageLocalFilePath);

  if (!avatar) {
    throw new ApiError(400, "avatar must be uploaded");
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    password,
    email,
    avatar: avatar.secure_url,
    coverImage: coverImage?.secure_url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered Successfully", createdUser));
});

//poast login user

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const loginUser = asnycHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "username or email are required");
  }

  if (!password) {
    throw new ApiError(400, "password is required");
  }

  //validation for email
  if (email && (!email.includes("@") || !email.includes("."))) {
    throw new ApiError(400, "Enter correct email");
  }

  const user = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid username/email or password ");
  }

  // checking password
  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid username/email or password ");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    " -password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "loggedIn Successfully!", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const logoutUser = asnycHandler(async (req, res) => {
  //refresh token remove from db and also clear cookie

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true, // return new updated data in reference
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User LogedOut successfully!"));
});

const regenerateAccessToken = asnycHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken ||
    req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try{
    const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token is expired or used");
  }


  const {newAccessToken: accessToken , newRefreshToken: refreshToken  } = await generateAccessTokenAndRefreshToken(user._id);


  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        "Access token Refreshed ",
        {newAccessToken, newRefreshToken}
      )
    );
  }
  catch(error){
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }

});

export { registerUser, loginUser, logoutUser, regenerateAccessToken };
