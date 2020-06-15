import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        DragDropModule
    ],
    exports: [
        MatDialogModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        DragDropModule
    ],
    providers: [

    ]
})

export class AngularMaterialModule {}