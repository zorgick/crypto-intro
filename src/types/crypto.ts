import {
  ParamsWithErrorOptions,
  ResponseErrorType,
} from './index';

export type ResponseBlockType = ResponseErrorType & {
  jsonrpc: string;
  id: number;
  result: {
    difficulty: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: string;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    totalDifficulty: string;
    transactions: ResponseBlockTransactionType[];
    transactionsRoot: string;
    uncles: any[];
  };
};

export type ResponseBlockTransactionType = {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to?: string;
  transactionIndex: string;
  value: string;
  v: string;
  r: string;
  s: string;
};

export type RequestGetBlockInfo = (params?: { number?: string; } & ParamsWithErrorOptions) => Promise<ResponseBlockType>;
export type ParamsGetBlockInfoType = Parameters<RequestGetBlockInfo>[number];
