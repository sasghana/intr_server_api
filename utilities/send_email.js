'use strict'

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import mandrillTransport from 'nodemailer-mandrill-transport';
import winston from 'winston';
import config from '../config/config'

const emailClient = {
  GMAIL: {
    host: 'smtp.gmail.com',
    port: 465
  },
  HOTMAIL: {
    host: 'smtp-mail.outlook.com',
    port: 587
  },
  EXCHANGE: {
    host: 'he16.globalhost.co.za',
    port: 25
  }
}

export default {

  SendEmail: (user) => {
    let transporter = nodemailer.createTransport({
      host: emailClient.EXCHANGE.host,
      secureConnection: false,
      port: emailClient.EXCHANGE.port,
      auth: {
        user: 'sasim@sasghana.com',
        pass: 'S@SIm*246'
      },
      tls: {rejectUnauthorized: false},
      debug: true
    })

    let mailOptions = {
      from: `SAS Ghana ✔ sasim@sasghana.com`,
      to: user.email,
      subject: 'Welcome SAS Finance Intranet',
      text: 'SAS Intranet Registration!',
      html: `Dear ${user.displayName},
             Thank you for being part of SAS Secured Private Network.
             Enter the platform to meet your collegues ${config.siteUrl}.
             Regards, SAS Finance IT Team.
             Thank you.`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error)
        console.log(error)
        
      console.log(`[MESSAGE SENT] [${user.email}]`)
      winston.info(`[MESSAGE SENT] [${JSON.stringify(info)}]`);
    })
  }

}



