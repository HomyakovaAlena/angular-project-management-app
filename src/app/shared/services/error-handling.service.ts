import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsHandlingMessagesMap } from '../constants/errorsHandlingMessages.constants';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  public getErrorHandlingMessages(errorResponse: HttpErrorResponse, module: string): string {
    const errorMessageType =
      ErrorsHandlingMessagesMap[module as keyof typeof ErrorsHandlingMessagesMap];
    return errorMessageType[errorResponse.status as keyof typeof errorMessageType]
      ? $localize`${
          errorMessageType[errorResponse.status as keyof typeof errorMessageType]
        }:error_message:.
              Error ${errorResponse.status}:error_status:`
      : $localize`${errorMessageType.default}:error_message:.
              Error ${errorResponse.status}:error_status:`;
  }
}
