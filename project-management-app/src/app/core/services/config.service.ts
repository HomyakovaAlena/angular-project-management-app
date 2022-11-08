import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

type AppEnv = typeof environment;

@Injectable({ providedIn: 'root' })
export class ConfigService {
  /**
   * Returns the server's host url
   */
  getAPIUrl(): string {
    return environment?.API_URL ?? '';
  }

  /**
   * Returns configuration for auth client and secret
   */
  getAuthSettings(): AppEnv['settings']['auth'] {
    return environment?.settings?.auth;
  }
}
