import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

type AppEnv = typeof environment;

@Injectable({ providedIn: 'root' })
export class ConfigService {
  getAPIUrl(): string {
    return environment?.API_URL ?? '';
  }

  getAuthSettings(): AppEnv['settings']['auth'] {
    return environment?.settings?.auth;
  }
}
