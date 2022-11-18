import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsHandlingMessagesMap } from '../constants/errorsHandlingMessages.constants';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  getErrorHandlingMessages(errorResponse: HttpErrorResponse, module: string): string {
    const errorMessageType =
      ErrorsHandlingMessagesMap[module as keyof typeof ErrorsHandlingMessagesMap];
    return errorMessageType[errorResponse.status as keyof typeof errorMessageType]
      ? `${errorMessageType[errorResponse.status as keyof typeof errorMessageType]}.
              Error ${errorResponse.status}`
      : `${errorMessageType.default}.
              Error ${errorResponse.status}`;
  }
}
