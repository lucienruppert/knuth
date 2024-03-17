import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Rows {
  [key: string]: Array<number>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public maximumColumns: Array<number> = [...Array(10).keys()].map(
    (x) => x + 1
  );
  public numberOfColumns: number = 0;
  public numberOfRows: number | undefined;
  public numberOfRowsArray: Array<number> = [];
  private originalValues: Array<number> = [];
  private quotient: number = 0;
  public rows: Rows = {};

  private setColumnValues(): void {
    const column = this.generateColumnValues();
    Object.entries(this.rows).forEach(([key], index) => {
      this.rows[key].push(column[index]);
    });
  }

  private generateColumnValues(): Array<number> {
    const columnValues: Array<number> = [];
    let number = 1;
    for (let i = 1; i <= this.numberOfRows!; i++) {
      columnValues.push(number);
      if (i % this.quotient === 0) number++;
    }
    return columnValues;
  }

  private createEmptyRows(): void {
    this.rows = {};
    this.numberOfRowsArray.forEach((rowNumber) => {
      this.rows[rowNumber] = [];
    });
  }

  getObjectEntries(object: Rows): Array<[string, Array<number>]> {
    return Object.entries(object);
  }

  public onSelectChange(): void {
    if (this.numberOfColumns == 0) return;
    this.setBasicVariables();
    this.createEmptyRows();
    this.setColumnValues();
  }

  private setBasicVariables(): void {
    this.originalValues = this.maximumColumns.slice(0, this.numberOfColumns);
    this.numberOfRows = this.originalValues.reduce(
      (previous, current) => previous! * current!
    );
    this.numberOfRowsArray = [...Array(this.numberOfRows).keys()].map(
      (number) => number + 1
    );
    this.quotient = this.numberOfRows / this.numberOfColumns;
  }
}
