'use strict'

import userModel from '../models/user/user.model'
import service from '../auth/jwt'
import utilities from '../utilities/utilities'
import sendemail from '../utilities/send_email'
import winston from '../config/winston'
import gravatar from 'gravatar'

export default {

  SignUp: async (req, res) => {
    try {
      console.log('register new user', req.body);
      const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
      console.log('get user avatar >>>'+ avatar);
      
      let validateResponse = { email: false, username: false }
      const { email, username } = req.body

      let find = await userModel.find({
        $or: [{email},{username}]
      })

      if (find.length === 0) {
        delete req.body.verificationPassword
        utilities.EncryptPassword(req)
        req.body.avatar = avatar;
        const user = await userModel.insertMany(req.body)

        winston.info('[SEND Signup email] ===>');
        sendemail.SendEmail(user[0])
      
        return res.status(200).send({
          message: 'Kindly verify your account in the link that we send you by email.',
          success: true
        })

      }

      find.forEach(user => {
        if (user.email === email)
          validateResponse.email = true

        if (user.username === username)
          validateResponse.username = true

      })

      winston.info(`[USER Valide response] ===> ${validateResponse}`);
      return res.status(200).send(validateResponse)

    } catch (error) {
      winston.error('[ERROR Signup] ==>', error);
      return res.status(500).send({
        message: `Error al crear el usuario: ${error}`
      })

    }
  },

  SignIn: async (req, res) => {
    try {
      const { account, password } = req.body
      let user = {}

      user = await userModel.findOne({
        $or: [{ email: account},{username: account}]
      })

      req.user = user

      if (utilities.DecodePassword(password, user.password)) {

        user.password = null;

        // The user account is valid and state is verify.
        if (user.state) {
          console.log('user account is valid and state is verify', user);
          return res.status(200).send({
            token: service.CreateToken(user),
            user: user,
            status: 200
          })
        }

        // Verifica tu cuenta en el link que te enviamos por correo electrónico
        // The user account is valid but a state account is not verify in the email.
        console.log('Valid user account require email verification ...');
        return res.status(200).send({
          code: 30,
          status: 200
        })
      }

      return res.status(403).send({
        code: 25,
        status: 404
      })

    } catch (error) {
      console.log(`Error login ==> ${error}`);
      return res.status(404).send({
        code: 25,
        status: 404
      })
    }
  }

}