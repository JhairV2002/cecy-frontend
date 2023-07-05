import { JsonToObjectPipe } from './json-to-object.pipe';

describe('JsonToObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonToObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
