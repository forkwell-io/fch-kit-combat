import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from '../material.module';
import {OverviewComponent} from './home/overview/overview.component';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminAgenciesComponent} from './admin/admin-agencies/admin-agencies.component';
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {AdminAgencyMemberRequestsComponent} from './admin/admin-agency-member-requests/admin-agency-member-requests.component';
import {AdminAgencyMemberRequestComponent} from './admin/admin-agency-member-request/admin-agency-member-request.component';
import {AgencyComponent} from './agency/agency.component';
import {AgencyOverviewComponent} from './agency/agency-overview/agency-overview.component';
import {AgencyDetailsComponent} from './agency/agency-details/agency-details.component';
import {AgencyRequestsComponent} from './agency/agency-requests/agency-requests.component';
import {AgencyRequestContributionComponent} from './agency/agency-request-contribution/agency-request-contribution.component';
import {AdminCreateAgencyComponent} from './admin/admin-create-agency/admin-create-agency.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FinishEmailAuthComponent} from './home/finish-email-auth/finish-email-auth.component';
import {MyComponentsModule} from '../my-components/my-components.module';
import {GoogleChartsModule} from 'angular-google-charts';
import {AdminDeleteUserDialogComponent} from './admin/admin-delete-user-dialog/admin-delete-user-dialog.component';
import {AgencyRequestComponent} from './agency/agency-request/agency-request.component';
import {AgencyDetailsEditComponent} from './agency/agency-details-edit/agency-details-edit.component';
import {AgencyRequestDeleteDialogComponent} from './agency/agency-request-delete-dialog/agency-request-delete-dialog.component';
import {ContributeComponent} from './home/contribute/contribute.component';
import {PublicRequestsComponent} from './home/public-requests/public-requests.component';
import {AgencyIncomingContributionsComponent} from './agency/agency-incoming-contributions/agency-incoming-contributions.component';
import {AgencyInboxComponent} from './agency/agency-inbox/agency-inbox.component';
import {MessageDialogComponent} from './agency/agency-inbox/message-dialog/message-dialog.component';
import {ContributionDialogComponent} from './agency/agency-incoming-contributions/contribution-dialog/contribution-dialog.component';
import {AgencyTransportingContributionsComponent} from './agency/agency-transporting-contributions/agency-transporting-contributions.component';
import {AgencyCompletedContributionsComponent} from './agency/agency-completed-contributions/agency-completed-contributions.component';
import {AgencyContributionsComponent} from './agency/agency-contributions/agency-contributions.component';
import {AgencyProfilePhotoDialogComponent} from './agency/agency-profile-photo-dialog/agency-profile-photo-dialog.component';
import {DragDropDirective} from './drag-drop.directive';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    OverviewComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminAgenciesComponent,
    AdminUsersComponent,
    AdminAgencyMemberRequestsComponent,
    AdminAgencyMemberRequestComponent,
    AgencyComponent,
    AgencyOverviewComponent,
    AgencyDetailsComponent,
    AgencyRequestsComponent,
    AgencyRequestContributionComponent,
    AdminCreateAgencyComponent,
    FinishEmailAuthComponent,
    AdminDeleteUserDialogComponent,
    AgencyRequestComponent,
    AgencyDetailsEditComponent,
    AgencyRequestDeleteDialogComponent,
    ContributeComponent,
    PublicRequestsComponent,
    AgencyIncomingContributionsComponent,
    AgencyInboxComponent,
    MessageDialogComponent,
    ContributionDialogComponent,
    AgencyTransportingContributionsComponent,
    AgencyCompletedContributionsComponent,
    AgencyContributionsComponent,
    AgencyProfilePhotoDialogComponent,
    DragDropDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
    ReactiveFormsModule,
    MyComponentsModule,
    GoogleChartsModule,
  ]
})
export class MainModule {
}
