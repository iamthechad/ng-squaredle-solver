import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AboutDialogComponent } from './dialog/about-dialog.component';

@Component({
  selector: 'mt-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class AboutComponent {
  constructor(private readonly dialog: MatDialog) {}

  public showAbout(): void {
    this.dialog.open(AboutDialogComponent);
  }
}
