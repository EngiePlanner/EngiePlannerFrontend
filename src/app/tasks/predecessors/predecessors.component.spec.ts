/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PredecessorsComponent } from './predecessors.component';

describe('PredecessorsComponent', () => {
  let component: PredecessorsComponent;
  let fixture: ComponentFixture<PredecessorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredecessorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredecessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
