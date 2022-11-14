import { ActivatedRoute } from '@angular/router';

export interface ModalData {
  name: string;
  title: string;
  description: string;
  actionButtonText: string;
  action: string;
  itemId?: string;
  itemName?: string;
  routeParameteres?: RouteParameteres;
}

export interface RouteParameteres {
  boardId?: string;
  columnId?: string;
  taskId?: string;
}
