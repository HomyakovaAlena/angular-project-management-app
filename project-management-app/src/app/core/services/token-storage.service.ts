import { Inject, Injectable } from '@angular/core';

import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private accessTokenKey: string;

  constructor(
    private configService: ConfigService,
    private localStorageService: LocalStorageService
  ) {
    const authSettings = this.configService.getAuthSettings();
    this.accessTokenKey = authSettings.accessTokenKey || 'accessToken';
  }

  getToken(): string {
    return this.localStorageService.getItem(this.accessTokenKey) as string;
  }


  saveToken(token: string) {
    this.localStorageService.setItem(this.accessTokenKey, token);
  }

  removeToken() {
    this.localStorageService.removeItem(this.accessTokenKey);
  }
}
