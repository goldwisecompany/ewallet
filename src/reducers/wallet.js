const walletInitialState = {
  myWallets: [],
  phrase: [],
  walletName: [],
  current: -1,
  currency: 'USD',
  pinCode: '',
  isGenerating: true,
};

const wallet = (state = walletInitialState, action) => {
  switch (action.type) {
    case 'CREATE_WALLET':
      const {myWallets, phrase} = action.payload;
      return {
        ...state,
        myWallets: [...state.myWallets, myWallets],
        phrase: [...state.phrase, phrase],
        current: state.current + 1,
        isGenerating: false,
      };
    case 'UPDATE_DATA':
      const {walletName, pinCode} = action.payload;
      return {
        ...state,
        walletName: [...state.walletName, walletName],
        pinCode: pinCode,
      };
    case 'CHANGE_WALLET':
      const {index} = action.payload;
      return {
        ...state,
        current: index,
      };
    case 'CHANGE_CURRENCY':
      return {
        ...state,
        currency: action.payload,
      };
    case 'RECREATE_WALLET':
      return {
        ...state,
        isGenerating: true,
      };
    default:
      return state;
  }
};

export default wallet;
