import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackgroundImageService } from '../../services/background-image/background-image.service';
import { ImageResponseModel } from '../../models/Image.response.model';
import { ImageDetailModel } from '../../models/image.details.model';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  imageDetails: ImageResponseModel;
  imageDetailList: ImageDetailModel[];
  clickedItem: ImageDetailModel;

  constructor(private dialogRef: MatDialogRef<BackgroundComponent>,
      private backgroundImageService: BackgroundImageService) { }

  ngOnInit(): void {
    this.backgroundImageService.getImageDetails().subscribe(
      (response: ImageResponseModel) => {
        this.imageDetails = response;
        this.imageDetailList = this.imageDetails.imageDetailsList;
      });
  }

  itemClicked(item) {
    this.clickedItem = item;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.clickedItem);
  }
}
