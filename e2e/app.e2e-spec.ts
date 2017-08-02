import { Ng4LeafletPage } from './app.po';

describe('ng4-leaflet App', () => {
  let page: Ng4LeafletPage;

  beforeEach(() => {
    page = new Ng4LeafletPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
