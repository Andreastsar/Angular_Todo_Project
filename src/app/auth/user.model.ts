export class User {
  constructor(
    public email: string,
    public localId: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public isRegistered?: boolean
  ) {}

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
