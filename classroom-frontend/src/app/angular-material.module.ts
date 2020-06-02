import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule

    ],
    exports: [
        MatDialogModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule
    ],
    providers: [

    ]
})

export class AngularMaterialModule {}