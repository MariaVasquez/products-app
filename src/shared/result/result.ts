export interface FieldError {
  field: string;
  error: string;
}

export class Result<T> {
  private constructor(
    public readonly status: number,
    public readonly code: string,
    public readonly message: string,
    public readonly data?: T,
    public readonly fieldErrors?: FieldError[],
  ) {}

  static ok<T>(
    data: T,
    code: string,
    message: string,
    status: number,
  ): Result<T> {
    return new Result<T>(status, code, message, data, []);
  }

  static fail<T = never>(
    code: string,
    message: string,
    status: number,
    fieldErrors: FieldError[] = [],
  ): Result<T> {
    return new Result<T>(status, code, message, undefined, fieldErrors);
  }

  isSuccess(): boolean {
    return this.status >= 200 && this.status < 300;
  }

  isFailure(): boolean {
    return !this.isSuccess();
  }

  toString(): string {
    return JSON.stringify({
      status: this.status,
      code: this.code,
      message: this.message,
      data: this.data,
      fieldErrors: this.fieldErrors,
    });
  }
}
