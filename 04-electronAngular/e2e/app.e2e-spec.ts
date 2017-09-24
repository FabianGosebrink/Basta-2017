import { FirstShotPage } from './app.po';

describe('first-shot App', () => {
  let page: FirstShotPage;

  beforeEach(() => {
    page = new FirstShotPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
