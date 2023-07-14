import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Botões
import { ButtonModule } from 'primeng/button';

// card e paineis
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';

// Forms e inputs
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

// Menus
import { SlideMenuModule } from 'primeng/slidemenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';

// Dialogs e overlays
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlockUIModule } from 'primeng/blockui';

// slide e efeitos

import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';

const formModules = [
//  AutoCompleteModule,
 // CalendarModule,
  InputMaskModule,
 // ListboxModule,
  InputTextModule,
  CheckboxModule,
  DropdownModule,
];

const buttonModules = [ButtonModule];

const menuModules = [
//  SlideMenuModule,
 // PanelMenuModule,
 // MenuModule,
 // SplitButtonModule,
];

const panelModules = [
 // CardModule,
  //ToolbarModule,
 // TabMenuModule,
  PanelModule,
 // AccordionModule,
];

const dialogModules = [
  // SidebarModule,
  DialogModule,
  MessagesModule,
  MessageModule,
  ToastModule,
  // ConfirmDialogModule,
  // BlockUIModule,
];

const sliderNeffecsModules = [
  SliderModule,
  SpinnerModule,
  RippleModule,
  ProgressBarModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...formModules,
    ...buttonModules,
    ...panelModules,
    ...sliderNeffecsModules,
    ...dialogModules,
  ],
  declarations: [],
  providers: [],
  exports: [
    CommonModule,
    ...formModules,
    ...buttonModules,
    ...panelModules,
    ...sliderNeffecsModules,
    ...dialogModules,
  ],
})
export class PrimeNGModule {}
