import { Component, OnInit } from '@angular/core';
import { Mark } from 'src/app/Models/Mark';
import { Model } from 'src/app/Models/Model';
import { MarksService } from 'src/app/Services/Marks/marks.service';
import { ModelsService } from 'src/app/Services/Models/models.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'AutoMI';
  showMenu = false;
  declare marks: Array<Mark>;
  declare models: Array<Model>;

  declare chosenMark: Mark;

  constructor(
    private markService: MarksService,
    private modelService: ModelsService
    ) { }

  ngOnInit(): void {
    this.loadMarks();
    this.loadModels();
  }

  public loadMarks() {
    this.markService.getAll().subscribe(
      value => {
        this.marks = value;
      }, 
      error => {
        console.log("Error while trying get all marks from database")
      }
    );
  }

  public loadModels() {
    this.modelService.getAll().subscribe(
      value => {
        this.models = value;
      }, 
      error => {
        console.log("Error while trying get all models from database")
      }
    );
  }

  public loadCorrectModels(value: any) {
    this.markService.getAllModelsByMark(value).subscribe(
      value => {
        this.models = value
      },
      error => {
        console.log("Error while trying get all models by mark from database")
      }
    ); 
  }



}
