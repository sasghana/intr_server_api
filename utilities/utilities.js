'use strict'

import bcrypt from 'bcrypt-nodejs'

const GetItemsToRegularExpression = (regex, value) => {
  var matches = [];
  var match;

  while ((match = regex.exec(value))) {
    matches.push(`@${match[1]}`);
  }

  return matches;
}

export default {
  EncodePassword:(password) => {
    return bcrypt.hashSync(password)
  },
  EncryptPassword: (req) => {
    const _EncryptPassword = bcrypt.hashSync(req.body.password)
    req.body.password = _EncryptPassword
  },
  DecodePassword: (password, passwordEncode) => {
    return bcrypt.compareSync(password, passwordEncode)
  },
  CheckIsEmail: (account) => {
    const regExpressionEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!regExpressionEmail.test(account))
      return false

    return true
  },
  GetFileExtension: (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  },
  FindUserMessagePublication(value) {

    let res = null;

    GetItemsToRegularExpression(/(?:^|\s)(?:@)([_a-zA-Z\u00f1\u00d1\d]+)/gm, value).forEach(item => {
      var regex = new RegExp(item, 'g');
      res = value.replace(regex, `<b><a href='/profile/${item}'>${item}</a><b>`);
      value = res
    })

    return value;

  }

}

