// BTC
// https://api.coinlore.net/api/ticker/?id=90
// ETH
// https://api.coinlore.net/api/ticker/?id=80
// BCH
// https://api.coinlore.net/api/ticker/?id=2321
// TRX
// https://api.coinlore.net/api/ticker/?id=2713

const btcRequest = fetch('https://api.coinlore.net/api/ticker/?id=90').then(
  res => res.json(),
);

const ethRequest = fetch('https://api.coinlore.net/api/ticker/?id=80').then(
  res => res.json(),
);

const bchRequest = fetch('https://api.coinlore.net/api/ticker/?id=2321').then(
  res => res.json(),
);

const trxRequest = fetch('https://api.coinlore.net/api/ticker/?id=2713').then(
  res => res.json(),
);

const usdtRequest = fetch('https://api.coinlore.net/api/ticker/?id=518').then(
  res => res.json(),
);

export const getPrice = async () => {
  try {
    const allPrice = await Promise.all([
      btcRequest,
      bchRequest,
      ethRequest,
      trxRequest,
      usdtRequest,
    ]);
    return allPrice;
  } catch (error) {
    return [];
  }
};
