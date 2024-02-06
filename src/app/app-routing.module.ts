import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ModalComponent } from "./modal/modal.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}