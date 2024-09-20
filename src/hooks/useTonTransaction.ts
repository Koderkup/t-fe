import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";

const useTonTransaction = () => {
  const [tonConnectUI] = useTonConnectUI();

  const sendTransaction = async (transaction: SendTransactionRequest) => {
    try {
      const result = await tonConnectUI.sendTransaction(transaction);
      return result;
    } catch (error) {
      return null;
    }
  };

  return {
    sendTransaction,
  };
};

export default useTonTransaction;
