import axios, { AxiosResponse } from 'axios';

import { revealError } from 'src/utils';
import { RequestGetBlockInfo, ResponseBlockType } from 'src/types';

export const getLatestBlockInfo: RequestGetBlockInfo = async ({ errorOptions } = {}) => {
  try {
    const { data }: AxiosResponse<ResponseBlockType> = await axios({
      method: 'GET',
      url: '/api/block/latest',
      params: {
        tmsp: `${new Date().getTime()}`,
      },
    });

    if (!data || data.error) {
      throw new Error(data.error?.message);
    }

    return data;
  } catch (error) {
    throw revealError({ ...error, ...errorOptions });
  }
};

export const getBlockInfo: RequestGetBlockInfo = async ({ number, errorOptions } = {}) => {
  try {
    const { data }: AxiosResponse<ResponseBlockType> = await axios({
      method: 'GET',
      url: `/api/block/${number}`,
      params: {
        tmsp: `${new Date().getTime()}`,
      },
    });

    if (!data || data.error) {
      throw new Error(data.error?.message);
    }

    return data;
  } catch (error) {
    throw revealError({ ...error, ...errorOptions });
  }
};
