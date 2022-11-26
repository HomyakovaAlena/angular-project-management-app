import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private accessTokenKey: string;

  constructor(
    private configService: ConfigService,
    private localStorageService: LocalStorageService,
  ) {
    const authSettings = this.configService.getAuthSettings();
    this.accessTokenKey = authSettings.accessTokenKey || 'accessToken';
  }

  public getToken(): string {
    return this.localStorageService.getItem(this.accessTokenKey) as string;
  }

  public saveToken(token: string) {
    this.localStorageService.setItem(this.accessTokenKey, token);
  }

  public removeToken() {
    this.localStorageService.removeItem(this.accessTokenKey);
  }
}
