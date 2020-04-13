import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {OverviewComponent} from './home/overview/overview.component';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminAgenciesComponent} from './admin/admin-agencies/admin-agencies.component';
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {AdminAgencyMemberRequestsComponent} from './admin/admin-agency-member-requests/admin-agency-member-requests.component';
import {AdminGuard} from './admin/admin.guard';
import {AdminAgencyMemberRequestComponent} from './admin/admin-agency-member-request/admin-agency-member-request.component';
import {AgencyComponent} from './agency/agency.component';
import {AgencyOverviewComponent} from './agency/agency-overview/agency-overview.component';
import {AgencyRequestsComponent} from './agency/agency-requests/agency-requests.component';
import {AgencyDetailsComponent} from './agency/agency-details/agency-details.component';
import {AgencyRequestContributionComponent} from './agency/agency-request-contribution/agency-request-contribution.component';
import {AdminCreateAgencyComponent} from './admin/admin-create-agency/admin-create-agency.component';
import {FinishEmailAuthComponent} from './home/finish-email-auth/finish-email-auth.component';
import {AgencyRequestComponent} from './agency/agency-request/agency-request.component';
import {AgencyDetailsEditComponent} from './agency/agency-details-edit/agency-details-edit.component';
import {ContributeComponent} from './home/contribute/contribute.component';
import {PublicRequestsComponent} from './home/public-requests/public-requests.component';
import {AgencyIncomingContributionsComponent} from './agency/agency-incoming-contributions/agency-incoming-contributions.component';
import {AgencyInboxComponent} from './agency/agency-inbox/agency-inbox.component';
import {AgencyCompletedContributionsComponent} from './agency/agency-completed-contributions/agency-completed-contributions.component';
import {AgencyTransportingContributionsComponent} from './agency/agency-transporting-contributions/agency-transporting-contributions.component';
import {AgencyContributionsComponent} from './agency/agency-contributions/agency-contributions.component';
import {LearnMoreComponent} from '../my-components/learn-more/learn-more.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {path: '', component: OverviewComponent},
          {path: 'finish-sign-up', component: FinishEmailAuthComponent},
          {path: 'contribute', component: ContributeComponent},
          {path: 'comm-requests', component: PublicRequestsComponent},
        ]
      },
      {
        path: 'learn-more',
        component: LearnMoreComponent
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        component: AdminComponent,
        children: [
          {path: '', component: AdminDashboardComponent},
          {path: 'users', component: AdminUsersComponent},
          {path: 'agencies', component: AdminAgenciesComponent},
          {path: 'create-agency', component: AdminCreateAgencyComponent},
          {
            path: 'agency-member-requests',
            children: [
              {path: '', component: AdminAgencyMemberRequestsComponent},
              {path: ':id', component: AdminAgencyMemberRequestComponent},
            ]
          },
        ]
      },
      {
        path: 'agency',
        component: AgencyComponent,
        children: [
          {path: '', component: AgencyOverviewComponent},
          {
            path: 'details',
            children: [
              {path: '', component: AgencyDetailsComponent},
              {path: 'edit', component: AgencyDetailsEditComponent},
            ]
          },
          {
            path: 'requests',
            children: [
              {path: '', component: AgencyRequestsComponent},
              {path: ':id', component: AgencyRequestComponent},
            ]
          },
          {
            path: 'in-contributions',
            children: [
              {path: '', component: AgencyIncomingContributionsComponent},
            ]
          },
          {
            path: 'transporting-contributions',
            children: [
              {path: '', component: AgencyTransportingContributionsComponent},
            ]
          },
          {
            path: 'done-contributions',
            children: [
              {path: '', component: AgencyCompletedContributionsComponent},
            ]
          },
          {
            path: 'inbox',
            children: [
              {path: '', component: AgencyInboxComponent},
            ]
          },
          {path: 'request-contribution', component: AgencyRequestContributionComponent},
          {path: 'my-contributions', component: AgencyContributionsComponent},
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
