export const createWallet = payload => ({
  type: 'CREATE_WALLET',
  payload: {
    ...payload,
  },
});

export const updateData = payload => ({
  type: 'UPDATE_DATA',
  payload: {
    ...payload,
  },
});

export const changeWallet = payload => ({
  type: 'CHANGE_WALLET',
  payload: {
    ...payload,
  },
});

export const changeCurrency = payload => ({
  type: 'CHANGE_CURRENCY',
  payload,
});

export const recreateWallet = () => ({
  type: 'RECREATE_WALLET',
});
