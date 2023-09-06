export class accessTokenDto {
  accessToken: string;
}

export class accessTokenPayloadDto {
  email: string;
  role: string;
  sub: number;
  active: boolean;
}
