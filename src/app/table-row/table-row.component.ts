// import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output , Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

type AOA = any[][];
@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  encapsulation: ViewEncapsulation.None,
})


export class TableRowComponent implements OnInit {

  constructor(private renderer:Renderer2) { }
  @ViewChild("bodtTbl", {static: false})  bodtTbl: ElementRef | undefined;
  ngOnInit(): void {
  }
  
  htmlToAdd: string = '';
  filterObj: any;
  allData_fiter: AOA = [];;
  @Output() arrData = new EventEmitter();
  private _allData: any;
  @Input() set allData(value: any) {
    this._allData = value;
    // this.allData = value;
    this.allData_fiter = this._allData;
    this.bildTbl();
  };
  get allData() { return this._allData; }
  private _header: any;
  @Input() set header(value: any) {
    if(!value)
    value=["techID", "ID", "type", "name", "paragraph", "title", "ref", "isSameLawRef", "isRefQK", "IsTitleRelevant", "isTitleRefRelevant", "myTest"];
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
  bildTbl() {
    var alldiv = '';
    // this.allData_fiter.forEach(element => {
      for (let i = 0; i < this.allData_fiter.length && i<2000; i++) {
      alldiv += `<div style="display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 32px;
      border-bottom:  1px solid #e7e7e7;" class="row_flex">`;
      var h=this.header;
      for (let j = 0; j < h.length; j++) {
     
        alldiv += `<div class="col_flex"><div>` + this.allData_fiter[i][j] + `</div></div>`;
      };
      alldiv += ` </div> `;
    };
    this.htmlToAdd = alldiv;
  }
  filter_data() {
    this.allData_fiter = this.allData;
    for (const key in this.filterObj) {
      //אם יש ערך מפלטר
      if (this.filterObj[key] && this.filterObj[key] != '') {
        var val = this.filterObj[key];
        //ערך זה עובר ובודק בכל השדות
        if (key == '_valFilter')
          this.allData_fiter = this.allData_fiter.filter((a:any) => a.map((s: string) => s.toString().includes(val.trim().toLowerCase())));
        else {
          var index = this.header.indexOf(key);

          this.allData_fiter = this.allData_fiter.filter((a: any) => (((typeof(a[index]) =='undefined' && val==' ')|| (typeof(a[index]) !='undefined' && a[index].toString().includes(val)))))
        }
      }


    } this.bildTbl();
    this.arrData.emit(this.allData_fiter);
    // const filterValue = this.filterObj._valFilter;
    // this.allData.filter = filterValue.trim().toLowerCase();
  }


}
