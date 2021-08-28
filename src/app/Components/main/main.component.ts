import { Component, OnInit } from '@angular/core';
import { Mark } from 'src/app/Models/Mark';
import { MarksService } from 'src/app/Services/Marks/marks.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'AutoMI';
  showMenu = false;
  declare marks: Array<Mark>;

  constructor(private markService: MarksService) { }

  ngOnInit(): void {
    this.getAllMarks();
  }

  public getAllMarks() {
    this.markService.getAll().subscribe(
      value => {
        this.marks = value;
      }, 
      error => {
        console.log("Error while trying get all marks from database")
      }
    );
  }



}
