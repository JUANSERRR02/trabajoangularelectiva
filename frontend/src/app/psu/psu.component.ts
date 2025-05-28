import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PsuService } from '../services/psu.service';

@Component({
  selector: 'app-psu',
  templateUrl: './psu.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class PsuComponent implements OnInit {
  psus: any[] = [];
  error: string | null = null;
  newPsu = { name: '', wattage: null };
  editingPsu: any = null;

  constructor(private psuService: PsuService) {}

  ngOnInit(): void {
    this.fetchAllPsus();
  }

  fetchAllPsus(): void {
    this.psuService.getAll().subscribe(
      (data) => {
        this.psus = data;
        this.error = null;
      },
      (err) => {
        this.error = 'Failed to load PSUs';
        console.error(err);
      }
    );
  }

  addPsu(): void {
    this.psuService.create(this.newPsu).subscribe(
      (data) => {
        this.psus.push(data);
        this.newPsu = { name: '', wattage: null };
      },
      (err) => {
        this.error = 'Failed to add PSU';
        console.error(err);
      }
    );
  }

  deletePsu(id: string): void {
    this.psuService.delete(id).subscribe(
      () => {
        this.psus = this.psus.filter((psu) => psu._id !== id);
      },
      (err) => {
        this.error = 'Failed to delete PSU';
        console.error(err);
      }
    );
  }

  startEdit(psu: any): void {
    this.editingPsu = { ...psu };
  }

  updatePsu(): void {
    this.psuService.update(this.editingPsu._id, this.editingPsu).subscribe(
      (updatedPsu) => {
        const index = this.psus.findIndex((psu) => psu._id === updatedPsu._id);
        if (index !== -1) {
          this.psus[index] = updatedPsu;
        }
        this.cancelEdit();
      },
      (err) => {
        this.error = 'Failed to update PSU';
        console.error(err);
      }
    );
  }

  cancelEdit(): void {
    this.editingPsu = null;
  }
}