import { Component, computed, OnInit, signal } from '@angular/core';
import { GSheetService, SheetTable } from '../gsheet-service';
import { CommonModule } from '@angular/common';
import { ChecklistPage } from '../../Models/TableModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checklist',
  imports: [CommonModule],
  templateUrl: './checklist.html',
  styleUrl: './checklist.css',
})
export class Checklist implements OnInit {
  sheetId = signal('');
  table = signal<SheetTable | null>(null);
  page = signal<ChecklistPage | null>(null);
  details = signal(false);

  
  pageIndex = signal(0);
  pageSize = 6;
  pagedSections = computed(() => {
  const p = this.page();
  if (!p) return [];
  const start = this.pageIndex() * this.pageSize;
  const end = start + this.pageSize;

  return p.sections.slice(
      this.pageIndex() * this.pageSize,
      (this.pageIndex() + 1) * this.pageSize
    )
  ;
});
  constructor(private route: ActivatedRoute, private sheetService: GSheetService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const source = params['s'];
      if (source)
        this.sheetId.set(source);
      this.LoadSheet();
    });
  }
  private LoadSheet(){
    this.sheetService.getSheet(this.sheetId()).subscribe(data =>{
      this.table.set(data);
      this.page.set(this.ConvertToCheckListModel(data))
      });
  }
  private ConvertToCheckListModel(table: SheetTable): ChecklistPage{
    const rows = table.rows;

const page: ChecklistPage = {
  title: rows[0][1],
  header: rows[0][3],
  sections: rows[1].slice(1).map((colTitle: string, colIndex: number) => ({
        title: colTitle,
        items: rows
          .slice(2)
          .map(r => r[colIndex + 1])
          .filter(v => !!v)
      }))
};
return page;
  }
  checkboxId(section: string, column: string): string {
  return `${section}__${column}`;
}
toggleInstructions(){
  this.details.set(!this.details());
}
}
