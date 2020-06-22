import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-random-participant',
  templateUrl: './random-participant.component.html',
  styleUrls: ['./random-participant.component.scss']
})
export class RandomParticipantComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
