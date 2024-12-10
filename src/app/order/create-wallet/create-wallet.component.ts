import { Component } from '@angular/core';
import * as ethers from 'ethers';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent {
  privateKey: string = '';
  walletAddress: string = '';

  createWallet() {
    // Tạo private key
    const wallet = ethers.Wallet.createRandom();
    this.privateKey = wallet.privateKey;

    // Tạo wallet từ private key để verify
    const walletFromPrivateKey = new ethers.Wallet(this.privateKey);
    this.walletAddress = walletFromPrivateKey.address;

    // Log ra để kiểm tra
    console.log('Private Key:', this.privateKey);
    console.log('Address:', this.walletAddress);

    // Verify private key format
    this.verifyPrivateKey(this.privateKey);
  }

  verifyPrivateKey(privateKey: string) {
    // Kiểm tra format
    if (!privateKey.startsWith('0x')) {
      console.error('Private key must start with 0x');
      return false;
    }

    if (privateKey.length !== 66) {
      console.error('Private key must be 66 characters long (including 0x)');
      return false;
    }

    const hexRegex = /^0x[0-9a-f]{64}$/i;
    if (!hexRegex.test(privateKey)) {
      console.error('Private key must contain only hex characters');
      return false;
    }

    return true;
  }
}
