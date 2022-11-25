import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/tasks/models/tasks.model';
@Pipe({
  name: 'tasksByColumns',
})
export class TasksByColumnsPipe implements PipeTransform {
  transform(value: Task[] | null | undefined, columnId: string): Task[] | undefined {
    return value?.filter((item) => item?.columnId === columnId);
  }
}
