import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
type AppEnv = typeof environment;

@Injectable({ providedIn: 'root' })
export class ConfigService {
  public getAuthSettings(): AppEnv['settings']['auth'] {
    return environment?.settings?.auth;
  }
}
