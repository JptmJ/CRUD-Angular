import { Routes } from '@angular/router';
import { UpdatePageComponent } from './components/update-page/update-page.component';
import { PageComponent } from './components/page/page.component';

export const routes: Routes = [
    { path: 'update-page', component: UpdatePageComponent },
    // ... other routes
    { path: '', component: PageComponent }, // Assuming you have a default route for PageComponent
];
