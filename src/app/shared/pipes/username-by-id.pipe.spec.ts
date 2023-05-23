import { UsernameByIdPipe } from './username-by-id.pipe';

describe('UsernameByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new UsernameByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
