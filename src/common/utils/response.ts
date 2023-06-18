import { ResponseDto } from '../dto/response.dto';

export function ResponseBody<T, MT>(data: T, meta: MT = null): ResponseDto<T> {
  return { meta, data };
}
