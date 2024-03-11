import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public maximumItems: Array<number> = [...Array(10).keys()].map((x) => x + 1);
  public selectedNumber: number = 0;
  public numberOfOutputs: number | undefined;
  public outputsArray: Array<number> = [];
  private baseItemsGroup: Array<number> = [];

  public onSelectChange(): void {
    if (this.selectedNumber == 0) return;
    this.baseItemsGroup = this.maximumItems.slice(0, this.selectedNumber);
    this.numberOfOutputs = this.baseItemsGroup.reduce(
      (previous, current) => previous! * current!
    );
    this.outputsArray = [...Array(this.numberOfOutputs).keys()].map(number => number + 1);
  }
}
