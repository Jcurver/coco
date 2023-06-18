export class ResponseDto<T> {
  public meta: any;
  public data: T[] | T;
}
