import { Component } from '@angular/core';
import { ArchvieServicesService } from './archvie-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public archiveservice: ArchvieServicesService) { }
  title = 'frontend';

  currentFile: File = null;
  sasUrl: string;
  res: any;
  startTime: any;
  endTime: any;
  totalTime: any;
  filelist: Array<any> = [];
  errmsg: String = '';

  onFileChange(event) {
    this.currentFile = event.target.files[0];
    console.log("File name : ", this.currentFile.name)

    this.getentries(this.currentFile, "password")
  }
  getentries(file: File, password: string) {
    console.log("File size : ", file.size)

    this.archiveservice.getentries(file, password).subscribe(async (data: any) => {
      console.log(data)
      const tempfile = []
      data.forEach((ele: any) => {
        // if (ele.attr == '....A') {
        tempfile.push({ "name": ele.name, "size": ele.size })
        // }
      });

      this.filelist = tempfile
    }, err => {
      console.log(err.error)
      this.errmsg = err.error.text
    });

  }
}

