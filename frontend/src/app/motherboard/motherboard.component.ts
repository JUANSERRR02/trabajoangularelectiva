import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotherboardService } from '../services/motherboard.service';

@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class MotherboardComponent implements OnInit {
  motherboards: any[] = [];
  error: string | null = null;
  newMotherboard = { name: '', formFactor: '' }; 
  editingMotherboard: any = null;

  constructor(private motherboardService: MotherboardService) {}

  ngOnInit(): void {
    this.fetchAllMotherboards();
  }

  fetchAllMotherboards(): void {
    this.motherboardService.getAll().subscribe(
      (data) => {
        this.motherboards = data;
        this.error = null;
      },
      (err) => {
        this.error = 'Failed to load motherboards';
        console.error(err);
      }
    );
  }

  addMotherboard(): void {
    this.motherboardService.create(this.newMotherboard).subscribe(
      (data) => {
        this.motherboards.push(data);
        this.newMotherboard = { name: '', formFactor: '' };
      },
      (err) => {
        this.error = 'Failed to add motherboard';
        console.error(err);
      }
    );
  }

  deleteMotherboard(id: string): void {
    this.motherboardService.delete(id).subscribe(
      () => {
        this.motherboards = this.motherboards.filter((mb) => mb._id !== id);
      },
      (err) => {
        this.error = 'Failed to delete motherboard';
        console.error(err);
      }
    );
  }

  startEdit(motherboard: any): void {
    this.editingMotherboard = { ...motherboard };
  }

  updateMotherboard(): void {
    this.motherboardService.update(this.editingMotherboard._id, this.editingMotherboard).subscribe(
      (updatedMotherboard) => {
        const index = this.motherboards.findIndex((mb) => mb._id === updatedMotherboard._id);
        if (index !== -1) {
          this.motherboards[index] = updatedMotherboard;
        }
        this.cancelEdit();
      },
      (err) => {
        this.error = 'Failed to update motherboard';
        console.error(err);
      }
    );
  }

  cancelEdit(): void {
    this.editingMotherboard = null;
  }
}