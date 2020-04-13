import {NgModule} from '@angular/core';
import {
  MdcButtonModule,
  MdcCardModule, MdcCheckboxModule, MdcChipsModule,
  MDCDataTableModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconButtonModule,
  MdcIconModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcMenuSurfaceModule, MdcRadioModule, MdcSliderModule,
  MdcSnackbarModule, MdcTextFieldModule,
  MdcTopAppBarModule,
  MdcTypographyModule,
} from '@angular-mdc/web';


@NgModule({
  exports: [
    MdcButtonModule,
    MdcCardModule,
    MDCDataTableModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcFormFieldModule,
    MdcIconButtonModule,
    MdcIconModule,
    MdcLinearProgressModule,
    MdcListModule,
    MdcMenuModule,
    MdcMenuSurfaceModule,
    MdcSnackbarModule,
    MdcTextFieldModule,
    MdcTopAppBarModule,
    MdcTypographyModule,
    MdcFabModule,
    MdcRadioModule,
    MdcSliderModule,
    MdcChipsModule
  ]
})
export class MaterialModule {
}
