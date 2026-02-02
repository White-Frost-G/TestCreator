import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GSheetService } from './gsheet-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Checklist } from "./checklist/checklist";

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, Checklist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /*saveProgress() {
    const state = this.items.map(item => ({
      id: item.id,
      checked: item.checked
    }));
    localStorage.setItem(`checklist_${this.sheetId}`, JSON.stringify(state));
  }

  loadSavedState() {
    const saved = localStorage.getItem(`checklist_${this.sheetId}`);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        state.forEach((savedItem: any) => {
          const item = this.items.find(i => i.id === savedItem.id);
          if (item) {
            item.checked = savedItem.checked;
          }
        });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }*/
}//1TVfnMSxBKuMk5BrMzb0o2DquxGODGXvZzyU9HJJ_dQY
