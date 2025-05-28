import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CpuService } from '../services/cpu.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class CpuComponent implements OnInit {
  cpus: any[] = [];
  error: string | null = null;
  newCpu = { name: '', cores: null };
  editingCpu: any = null;

  constructor(private cpuService: CpuService) {}

  ngOnInit(): void {
    this.fetchAllCpus();
  }

  fetchAllCpus(): void {
    this.cpuService.getAll().subscribe(
      (data) => {
        this.cpus = data;
        this.error = null;
      },
      (err) => {
        this.error = 'Failed to load CPUs';
        console.error(err);
      }
    );
  }

  addCpu(): void {
    this.cpuService.create(this.newCpu).subscribe(
      (data) => {
        this.cpus.push(data);
        this.newCpu = { name: '', cores: null };
      },
      (err) => {
        this.error = 'Failed to add CPU';
        console.error(err);
      }
    );
  }

  deleteCpu(id: string): void {
    this.cpuService.delete(id).subscribe(
      () => {
        this.cpus = this.cpus.filter((cpu) => cpu._id !== id);
      },
      (err) => {
        this.error = 'Failed to delete CPU';
        console.error(err);
      }
    );
  }

  startEdit(cpu: any): void {
    this.editingCpu = { ...cpu };
  }

  updateCpu(): void {
    this.cpuService.update(this.editingCpu._id, this.editingCpu).subscribe(
      (updatedCpu) => {
        const index = this.cpus.findIndex((cpu) => cpu._id === updatedCpu._id);
        if (index !== -1) {
          this.cpus[index] = updatedCpu;
        }
        this.cancelEdit();
      },
      (err) => {
        this.error = 'Failed to update CPU';
        console.error(err);
      }
    );
  }

  cancelEdit(): void {
    this.editingCpu = null;
  }
}