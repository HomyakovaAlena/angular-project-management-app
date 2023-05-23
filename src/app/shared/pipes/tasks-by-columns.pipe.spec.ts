import { TasksByColumnsPipe } from './tasks-by-columns.pipe';

describe('TasksByColumnsPipe', () => {
  it('create an instance', () => {
    const pipe = new TasksByColumnsPipe();
    expect(pipe).toBeTruthy();
  });
});
