var crypto = require('crypto');

//加密
exports.jiami = function (buf,key) {
    var encrypted = "";
    var cip = crypto.createCipher('aes192', key); //第一个为加密方式 第二个为密匙
    encrypted += cip.update(buf, 'utf8', 'hex');
    encrypted += cip.final('hex');
    return encrypted
};

//解密
exports.jiemi = function (encrypted,key) {
    var decrypted = "";
    var decipher = crypto.createDecipher('aes192', key);  //第一个为加密方式 第二个为密匙
    decrypted += decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
};