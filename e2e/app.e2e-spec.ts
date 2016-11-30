import { ClassSurveyPage } from './app.po';

describe('class-survey App', function() {
  let page: ClassSurveyPage;

  beforeEach(() => {
    page = new ClassSurveyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
