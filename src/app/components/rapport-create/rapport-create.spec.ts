import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportCreate } from './rapport-create';

describe('RapportCreate', () => {
  let component: RapportCreate;
  let fixture: ComponentFixture<RapportCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
