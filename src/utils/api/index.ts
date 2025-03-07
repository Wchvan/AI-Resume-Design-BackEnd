import type { Response } from 'src/utils/api/types';
import { RESPONSE_CODE, RESPONSE_MSG } from 'src/utils/api/enums';

/**
 * @description: 统一返回体
 */
export const responseMessage = <T = any>(
  data: T,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): Response<T> => ({ data, msg, code, timestamp: Date.now() });
