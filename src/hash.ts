import sha256 from 'crypto-js/sha256'
import md5 from 'crypto-js/md5'
import sha1 from 'crypto-js/sha1'
import sha224 from 'crypto-js/sha224'
import sha3 from 'crypto-js/sha3'
import sha512 from 'crypto-js/sha512'
import sha384 from 'crypto-js/sha384'
import crypto from 'crypto-js'

export const hexEncode = (str) => {
  return crypto.enc.Hex.stringify(crypto.enc.Utf8.parse(str))
}
export const hexDecode = (str) => {
  return crypto.enc.Utf8.stringify(crypto.enc.Hex.parse(str))
}

export { sha256, md5, sha1, sha224, sha3, sha512, sha384 }
