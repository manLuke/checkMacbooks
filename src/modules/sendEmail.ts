// this function will send an email with product data
// to use gmail, it's necessary to get OAuth 2.0 Client IDs from google cloud API & Services and get the refresh token

const nodemailer = require('nodemailer');
import { Product } from "../types/products";

require("dotenv").config();

export const sendEmail = async (data: Product) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  let mailOptions = {
    from: '<youremail@gmail.com>',
    to: '<someemail@gmail.com>',
    subject: `New product for search ${data.search}`,
    text: `${data.title} - ${data.description} - ${data.price}`
  };

  await transporter.sendMail(mailOptions, function(err: any, data: any) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}