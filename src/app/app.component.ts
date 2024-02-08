import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdatePageComponent } from './components/update-page/update-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageComponent, HttpClientModule, UpdatePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud';
}
