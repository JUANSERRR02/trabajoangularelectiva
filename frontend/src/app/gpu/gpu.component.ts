import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GpuService } from '../services/gpu.service';

@Component({
  selector: 'app-gpu',
  templateUrl: './gpu.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class GpuComponent implements OnInit {
  gpus: any[] = [];
  error: string | null = null;
  newGpu = { name: '', brand: '' };
  editingGpu: any = null;

  constructor(private gpuService: GpuService) {}

  ngOnInit(): void {
    this.fetchAllGpus();
  }

  fetchAllGpus(): void {
    this.gpuService.getAll().subscribe(
      (data) => {
        console.log(data)
        this.gpus = data;
        this.error = null;
      },
      (err) => {
        this.error = 'Failed to load GPUs';
        console.error(err);
      }
    );
  }

  addGpu(): void {
    this.gpuService.create(this.newGpu).subscribe(
      (data) => {
        this.gpus.push(data);
        this.newGpu = { name: '', brand: '' };
      },
      (err) => {
        this.error = 'Failed to add GPU';
        console.error(err);
      }
    );
  }

  deleteGpu(id: string): void {
    this.gpuService.delete(id).subscribe(
      () => {
        this.gpus = this.gpus.filter((gpu) => gpu._id !== id);
      },
      (err) => {
        this.error = 'Failed to delete GPU';
        console.error(err);
      }
    );
  }

  startEdit(gpu: any): void {
    this.editingGpu = { ...gpu };
  }

  updateGpu(): void {
    this.gpuService.update(this.editingGpu._id, this.editingGpu).subscribe(
      (updatedGpu) => {
        const index = this.gpus.findIndex((gpu) => gpu._id === updatedGpu._id);
        if (index !== -1) {
          this.gpus[index] = updatedGpu;
        }
        this.cancelEdit();
      },
      (err) => {
        this.error = 'Failed to update GPU';
        console.error(err);
      }
    );
  }

  cancelEdit(): void {
    this.editingGpu = null;
  }
}