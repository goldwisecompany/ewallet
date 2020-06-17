import Web3 from 'web3';
import TronWeb from 'tronweb';
import * as Bip39 from 'bip39';
import EthereumWallet from 'ethereumjs-wallet';
import Hdkey from 'ethereumjs-wallet/hdkey';
import * as Bitcoin from 'bitcoinjs-lib';
import * as bitcore from 'bitcore-lib-cash';
import {BITBOX} from 'bitbox-sdk';
import bigInt from 'big-integer';
import {Decimal} from 'decimal.js';

export const bnToHex = bigNumber => bigInt(bigNumber).toString(16);

export const bitbox = new BITBOX();
// ETH
export const web3 = new Web3(
  'https://mainnet.infura.io/v3/ad44aa85b3ea4cb6b207760c9e5b37ee',
);

export const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];

// TRX
const {HttpProvider} = TronWeb.providers;
const tronProviderUrl = 'https://v2.api.trongrid.io';
// 'https://api.trongrid.io'
// 'https://api.shasta.trongrid.io/'
const fullNode = new HttpProvider(tronProviderUrl);
const solidityNode = new HttpProvider(tronProviderUrl);
const eventServer = new HttpProvider(tronProviderUrl);
export const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

export const generateMnemonic = () => Bip39.generateMnemonic();

export const validateMnemonic = phrase => Bip39.validateMnemonic(phrase);

export const generateCoinWallet = async (phrase, coinType) => {
  const seed = await Bip39.mnemonicToSeed(phrase);
  const hdWallet = Hdkey.fromMasterSeed(seed);
  let node;
  if (coinType === '0') {
    const hdWalletRoot = Bitcoin.bip32.fromSeed(seed);
    node = hdWalletRoot.derivePath("m/44'/0'/0'/0/0");
    // TODO:
    return {
      phrase,
      privateKey: node.toWIF(),
      address: Bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: Bitcoin.networks.bitcoin,
      }).address,
    };
  } else if (coinType === '145') {
    const hdWalletRoot = Bitcoin.bip32.fromSeed(seed);
    node = hdWalletRoot.derivePath("m/44'/145'/0'/0/0");
    const wif = node.toWIF();
    const address = new bitcore.PrivateKey(wif).toAddress();
    return {
      phrase,
      privateKey: wif,
      // address: address.toString(bitcore.Address.CashAddrFormat),
      address: address.toString(),
    };
  } else if (coinType === '195') {
    node = hdWallet.derivePath("m/44'/195'/0'/0/0");
    const tronWallet = node.getWallet();
    const privateKey = tronWallet.privKey.toString('hex');
    const account = tronWeb.address.fromPrivateKey(privateKey);
    return {
      phrase,
      privateKey,
      address: account,
    };
  } else {
    node = hdWallet.derivePath(`m/44'/${coinType}'/0'/0/0`);
    const privateKey = node.getWallet().getPrivateKeyString();
    return {
      phrase,
      privateKey,
      address: node.getWallet().getAddressString(),
    };
  }
};

// Transactions
export const transferTrx = async (receiver, amount, sender, privateKey) => {
  const sunAmount = tronWeb.toSun(amount);
  try {
    const tx = await tronWeb.transactionBuilder.sendTrx(
      receiver,
      sunAmount,
      sender,
    );
    const signedTx = await tronWeb.trx.sign(tx, privateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedTx);
    return receipt.transaction.txID;
  } catch (error) {
    throw new Error(error);
  }
};

export const transferEth = async (receiver, amount, sender, privateKey) => {
  const value = web3.utils.toWei(amount, 'ether');
  try {
    const receipt = await web3.eth.sendTransaction({
      from: sender,
      to: receiver,
      value,
      gas: 21000,
    });
    return receipt;
  } catch (error) {
    throw new Error(error);
  }
};

export const transferBch = async (receiver, amount, sender, mnemonic) => {
  const transactionBuilder = new bitbox.TransactionBuilder('mainnet');
  try {
    // Utxo
    const utxo = await bitbox.Address.utxo(sender);
    console.log(utxo, 'utxo');
    let balance = 0;
    utxo.utxos.every((item, index) => {
      balance += item.satoshis;
      transactionBuilder.addInput(item.txid, item.vout);
    });
    console.log(transactionBuilder, 'transactionBuilder');
    const amountInSatoshi = bitbox.BitcoinCash.toSatoshi(amount);
    const byteCount = bitbox.BitcoinCash.getByteCount({P2PKH: 1}, {P2PKH: 2});
    const sendAmount = amountInSatoshi - byteCount;
    transactionBuilder.addOutput(receiver, sendAmount);
    // Change
    transactionBuilder.addOutput(sender, balance - sendAmount - byteCount);

    transactionBuilder.setLockTime(50000);
    // Sign
    const seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
    // create HDNode from seed buffer
    const hdNode = bitbox.HDNode.fromSeed(seedBuffer);
    // keypair
    let keyPair = bitbox.HDNode.toKeyPair(hdNode);
    // empty redeemScript variable
    let redeemScript;
    // sign w/ keyPair
    transactionBuilder.sign(
      0,
      keyPair,
      redeemScript,
      transactionBuilder.hashTypes.SIGHASH_ALL,
      amountInSatoshi,
      // transactionBuilder.signatureAlgorithms.SCHNORR,
    );
    const tx = transactionBuilder.build();
    const hex = tx.toHex();
    // sendRawTransaction to running BCH node
    try {
      const sendRawTransaction = await bitbox.RawTransactions.sendRawTransaction(
        hex,
      );
      return sendRawTransaction.txid || sendRawTransaction.hash;
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const transferBtc = async (receiver, amount, sender, privateKey) => {
  // TODO: migrate to mainnet
  const url = 'https://api.blockcypher.com/v1/btc/main/addrs/';
  const amountInSatoshi = bitbox.BitcoinCash.toSatoshi(amount);
  let balance = 0;
  const mainnet = Bitcoin.networks.bitcoin;
  try {
    const result = await fetch(`${url}${sender}`);
    const json = await result.json();
    let unspentOutputs = json.txrefs.filter(
      item => !item.spent && item.tx_output_n !== -1,
    );
    const txb = new Bitcoin.TransactionBuilder(mainnet);
    unspentOutputs.every(item => {
      balance += item.value;
      txb.addInput(item.tx_hash, item.tx_output_n);
      return amountInSatoshi + 15000 > balance;
    });
    // UTXO Output
    txb.addOutput(receiver, amountInSatoshi);
    txb.addOutput(sender, balance - amountInSatoshi - 15000); // Change Address, fee:15000
    // Add private key
    const key = Bitcoin.ECPair.fromWIF(privateKey, mainnet);
    // Sign
    txb.__INPUTS.forEach((item, index) => {
      txb.sign(index, key);
    });
    const tx = txb.build().toHex();
    const pushTx = {
      tx,
    };
    // Main:
    // https://blockchain.info/pushtx
    // https://live.blockcypher.com/btc/pushtx/
    // https://blockexplorer.com/api/tx/send
    // https://api.blockcypher.com/v1/btc/main/txs/push
    // test:
    // https://api.blockcypher.com/v1/btc/test3/txs/push
    const txResult = await fetch(
      'https://api.blockcypher.com/v1/btc/main/txs/push',
      {
        method: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify(pushTx),
      },
    );
    const receipt = await txResult.json();
    const hash = (receipt && receipt.tx && receipt.tx.hash) || '';
    return hash;
  } catch (error) {
    if (error.message === 'Unexpected token N in JSON at position 0') {
      throw new Error('No free outputs to spend');
    }
    throw new Error(error);
  }
};

export const transferPrn = async (receiver, amount, sender, privateKey) => {
  const inputData0 = receiver.substring(2).padStart(64, '0');
  const inputData1 = bnToHex(web3.utils.toWei(amount, 'wei')).padStart(64, '0');
  const txData = `0xa9059cbb${inputData0}${inputData1}`.toLowerCase();

  try {
    const receipt = await web3.eth.sendTransaction({
      from: sender,
      to: '0x222258845094017fEB89efBaf2776e1F19951dfd',
      value: '0',
      gas: 90000,
      data: txData,
    });
    return receipt;
  } catch (error) {
    throw new Error(error);
  }
};

export const transferUsdt = async (receiver, amount, sender, privateKey) => {
  const inputData0 = receiver.substring(2).padStart(64, '0');
  const inputData1 = bnToHex(web3.utils.toWei(amount, 'mwei')).padStart(
    64,
    '0',
  );
  const txData = `0xa9059cbb${inputData0}${inputData1}`.toLowerCase();

  try {
    const receipt = await web3.eth.sendTransaction({
      from: sender,
      to: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      value: '0',
      gas: 90000,
      data: txData,
    });
    return receipt;
  } catch (error) {
    throw new Error(error);
  }
};
