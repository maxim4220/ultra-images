import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { createStableFixture } from '../testing/test-utils';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = await createStableFixture(AppComponent);
  });

  it('renders the home navigation link', () => {
    const homeLink = fixture.nativeElement.querySelector('[data-cy="home-link"]') as HTMLAnchorElement;

    expect(homeLink).toBeTruthy();
    expect(homeLink.textContent?.trim()).toBe('Giphy');
    expect(homeLink.getAttribute('href')).toBe('/');
  });
});
