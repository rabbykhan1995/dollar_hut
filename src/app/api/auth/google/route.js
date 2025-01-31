import { NextResponse } from "next/server";
import { generateToken } from "@/utils/Backend/jwt";
import prisma from "../../../../../lib/prisma";

export async function POST(req){
    try {
      // Extract token from request body
      const {accessToken} = await req.json();
  
      if (!accessToken) {
        return NextResponse.json({ error: "Missing access token" }, { status: 400 });
      }
  
    //   // Fetch user info from Google using the access token
      const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 304 })}
  
      const userData = await response.json();
      // console.log({google:userData});
      
      // if user already exist with openId, then send the response to the user directly.
      const is_user_exist = await prisma.user.findFirst({
        where: {
          openId: userData.id,
        },
      });

      if(is_user_exist){
        // we generate token for the login
        const token = await generateToken({
          id: is_user_exist.id,
          email: is_user_exist.email,
          userType: is_user_exist.userType,
        });
        return NextResponse.json(is_user_exist,{ status:201,
          headers: {
            Authorization: `Bearer ${token}`,
            "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
          } });
      }
      
      // if user not exist then register the user by adding the information to the database...
      const user = await prisma.user.create({
        data: {
          openId:userData.id,
          name:userData.name,
          email:userData.email,
        },
      });

      if(!user){
        return NextResponse.json({msg:'registration failed'}, {status:404});
      }
      // if user data stored in database, then create token and store in into the cookie of the client of the jwt token.
      const token = await generateToken({
        id: user.id,
        email: user.email,
        userType: user.userType,
      });


      return NextResponse.json(user, {
        status:201,
        headers: {
          Authorization: `Bearer ${token}`,
          "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
        },
      });
  
    }
 catch (error) {
  console.log(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
