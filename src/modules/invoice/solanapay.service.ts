import { Keypair, PublicKey, } from '@solana/web3.js';
import { encodeURL, } from '@solana/pay';
import BigNumber from 'bignumber.js';


// const secret = [225,14,96,110,188,191,153,44,1,44,139,115,73,83,172,135,119,88,51,56,38,105,130,147,96,180,149,58,170,40,188,166,196,106,164,237,107,52,79,32,87,32,164,232,114,20,150,146,57,145,234,224,31,204,196,128,123,133,143,178,192,220,198,175];
// const payer = Keypair.fromSecretKey(new Uint8Array(secret));
// const SOLANA_CONNECTION_ENDPOINT = "https://serene-delicate-bush.solana-devnet.quiknode.pro/3aeb65ba616ca9e2c3a9f8e04bb25f6b7628414f/"

// const connection: Connection = new Connection(SOLANA_CONNECTION_ENDPOINT, 'confirmed')

export class SolanapayService{
    destinationAddress: PublicKey;
    amount: BigNumber;
    description: string;
    memo: string;
    reference : PublicKey

  constructor(
    destinationAddress: string,
    amount: number,
    description: string="",
    memo: string=""
  ){
    this.amount = new BigNumber(amount)
    this.destinationAddress = new PublicKey(destinationAddress)
    this.description = description
    this.memo = memo
    this.reference = new Keypair().publicKey

  }

  generatePaymentLink(): URL{
    const url: URL = encodeURL({
        memo: this.memo, amount:this.amount,
      message: this.description, reference:this.reference,
      recipient:this.destinationAddress
    }
    )
    return url;
  }

  // validatePaymentLink(){
  //
  // }
}


