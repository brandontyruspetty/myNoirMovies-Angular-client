import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-page',
  templateUrl: './director-page.component.html',
  styleUrls: ['./director-page.component.scss']
})

//fetchApiData to use functions to make API call
//@inject used to specify the director specific data pulled from MAT_DIALOG_DATA to be injected into the component
export class DirectorPageComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birthday: any;
    }
  ) { }

  ngOnInit(): void { }

}


