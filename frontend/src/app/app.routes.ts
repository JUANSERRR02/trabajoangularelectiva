import { Routes } from '@angular/router';

import { CpuComponent } from './cpu/cpu.component';
import { GpuComponent } from './gpu/gpu.component';
import { MotherboardComponent } from './motherboard/motherboard.component';
import { PsuComponent } from './psu/psu.component';

export const routes: Routes = [
  { path: 'cpu', component: CpuComponent },
  { path: 'motherboard', component: MotherboardComponent },
  { path: 'psu', component: PsuComponent },
  { path: 'gpu', component: GpuComponent },
  { path: '', redirectTo: '/cpu', pathMatch: 'full' },
];
