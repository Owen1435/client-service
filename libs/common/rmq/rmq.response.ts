export class RmqResponse<T> {
  payload: T;
  status: number;
  error: Error;

  constructor(payload, status, error = null) {
    this.payload = payload;
    this.status = status;
    this.error = error;
  }
}
