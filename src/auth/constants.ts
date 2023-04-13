import { ConfigService } from '@nestjs/config';
require('dotenv').config();

export const jwtConstants = {
  secret: process.env.PORT,
};
