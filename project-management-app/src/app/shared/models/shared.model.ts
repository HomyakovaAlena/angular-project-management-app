import { ActivatedRoute } from '@angular/router';

export interface ModalData {
  name: string;
  title: string;
  description: string;
  actionButtonText: string;
  action: string;
  itemId?: string;
  itemName?: string;
  parameters?: Parameteres;
}

export interface Parameteres {
  boardId?: string;
  columnId?: string;
  taskId?: string;
  order?: number;
}
