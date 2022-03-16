/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AspSolverService } from './asp-solver.service';

describe('Service: AspSolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AspSolverService]
    });
  });

  it('should ...', inject([AspSolverService], (service: AspSolverService) => {
    expect(service).toBeTruthy();
  }));
});
