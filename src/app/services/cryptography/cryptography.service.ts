import CryptoES from 'crypto-es';
import * as NodeForge from 'node-forge';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { RSAKeyPair } from '../../models/keypair.model';
import { StorageService } from '../storage/storage.service';
import { AppConstants } from '../../constants/app.constants';
import { AccessTokenData } from '../../models/token-data.model';

@Injectable({
  providedIn: 'root'
})

export class CryptographyService {
  constructor(private storageService: StorageService, private tokenService: TokenService) { }

  async getRSAKeyPair() {
    let keypair = NodeForge.pki.rsa.generateKeyPair();
    let publicKey = NodeForge.pki.publicKeyToPem(keypair.publicKey);
    let privateKey = NodeForge.pki.privateKeyToPem(keypair.privateKey);
    let rsaKeyPair: RSAKeyPair = { rsaPublicKey: publicKey, rsaPrivateKey: privateKey };
    return rsaKeyPair;
  }

  getRandomSalt(): string {
    return CryptoES.lib.WordArray.random(32).toString();
  }

  getRandomKey(secret: string, keySize?: number): string {
    let randomBytes = CryptoES.lib.WordArray.random(32);
    let randomKey = CryptoES.PBKDF2(secret, randomBytes, { keySize: keySize ? keySize : 32 })
    return randomKey.toString();
  }

  async deriveKey(secret: string, salt: string, iterations: number) {
    let config = { keySize: 32, iterations: iterations };
    let derivedKey = CryptoES.PBKDF2(secret, salt, config).toString();
    return derivedKey;
  }

  rsaEncrypt(originalText: string, pemPublicKey: string) {
    let publicKey = NodeForge.pki.publicKeyFromPem(pemPublicKey);
    return window.btoa(publicKey.encrypt(originalText));
  }

  rsaDecrypt(cipherText: string, pemPrivateKey: string) {
    let privateKey = NodeForge.pki.privateKeyFromPem(pemPrivateKey);
    return privateKey.decrypt(window.atob(cipherText));
  }

  encrypt(originalText: string, key: string): string {
    if (!originalText || !originalText.trim()) return AppConstants.emptyString;
    return CryptoES.AES.encrypt(originalText, key).toString();
  }

  decrypt(cipherText: string, key: string): string {
    if (cipherText == AppConstants.emptyString) return AppConstants.emptyString;
    return CryptoES.AES.decrypt(cipherText, key).toString(CryptoES.enc.Utf8);
  }

  getDecryptedAccessToken(): AccessTokenData {
    let accessToken = this.storageService.getValue(AppConstants.tokens.accessToken);
    let decodedToken: AccessTokenData = this.tokenService.getTokenData<AccessTokenData>(accessToken);

    let derivedKey = this.storageService.getValue(AppConstants.keys.derivedKey);

    decodedToken.dataKey = this.decrypt(decodedToken.dataKey, derivedKey);
    decodedToken.rsaPrivateKey = this.decrypt(decodedToken.rsaPrivateKey, decodedToken.dataKey);

    return decodedToken;
  }

  getDecryptedIdentityToken(token: string) {   
    var iv = CryptoES.enc.Utf8.parse("P6FAb6qk3fQwsJSX");
    var key = CryptoES.enc.Utf8.parse("nORrpH21LXQjbh5FISNKsNcMmN0VgoZD");
       
    var decryptedBytes = CryptoES.AES.decrypt(token, key, { iv: iv });
    var decryptedToken = decryptedBytes.toString(CryptoES.enc.Utf8);

    return decryptedToken;
  }
}

