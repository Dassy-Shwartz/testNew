import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})


export class TableRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  filterObj: any;
  allData_fiter = [];
  @Output() arrData = new EventEmitter();
  private _allData: any;
  @Input() set allData(value: any) {
    this._allData = value;
    // this.allData = value;
    this.allData_fiter = this._allData;

  };
  get allData() { return this._allData; }
  private _header: any;
  @Input() set header(value: any) {
    this._header = value; this.filterObj = {};
    // this.header = this._header;
    this.header.forEach((element: string) => {

      this.filterObj[element] = '';
      this.filterObj._valFilter = '';
    });
  };
  get header() { return this._header; }


  onFilter(res_filter: any) {
    this.arrData.emit(res_filter)
  }

  applyFilter(event: Event) {

  }
  filter_data() {
    this.allData_fiter = this.allData;
    for (const key in this.filterObj) {
      //אם יש ערך מפלטר
      if (this.filterObj[key] && this.filterObj[key] != '') {
        var val=this.filterObj[key];
        //ערך זה עובר ובודק בכל השדות
        if (key == '_valFilter')
        this.allData_fiter=this.allData_fiter.filter((a: []) => a.map((s: string) => s.toString().includes(val.trim().toLowerCase())));
        else {
          var index = this.header.indexOf(key);
          
          this.allData_fiter= this.allData_fiter.filter((a: any) => (a[index] && a[index].toString().includes(val)))
        }
      }


    } this.arrData.emit(this.allData_fiter);
    // const filterValue = this.filterObj._valFilter;
    // this.allData.filter = filterValue.trim().toLowerCase();
  }

 
}
