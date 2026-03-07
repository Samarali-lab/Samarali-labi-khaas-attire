import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): { status: string; app: string; version: string } {
    return {
      status: 'ok',
      app: 'Khaas Attire API',
      version: '1.0.0',
    };
  }
}
