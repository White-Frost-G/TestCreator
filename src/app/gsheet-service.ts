import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Papa from 'papaparse';

export interface SheetTable {
  columns: string[];
  rows: any[][];
  objects: any[];
}
@Injectable({
  providedIn: 'root',
})

export class GSheetService {

  constructor(private http: HttpClient) {}

  getSheet(sheetId: string): Observable<SheetTable> {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;


    return this.http.get(url, { responseType: 'text' }).pipe(
      map(text => this.parseGoogleSheet(text))
    );
  }

  private parseGoogleSheet(text: string): SheetTable {
    // Remove JS wrapper
    const json = JSON.parse(
      text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1)
    );

    const table = json.table;

    const columns = table.cols.map((c: any) => c.label);

    const rows = table.rows.map((r: any) =>
      r.c.map((cell: any) => cell ? cell.v : null)
    );

    const objects = rows.map((row: { [x: string]: any; }) =>
      columns.reduce((obj: any, col: string | number, i: string | number) => {
        obj[col] = row[i];
        return obj;
      }, {})
    );

    return { columns, rows, objects };
  }
}
