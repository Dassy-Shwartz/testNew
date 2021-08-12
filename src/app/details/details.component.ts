import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  details = {
    no_no: 0,
    no_err: 0,
    no_valid: 0,
    err_no: 0,
    valid_no: 0,
    err_this: 0, err_err: 0, valid_valid: 0, valid_err: 0, err_valid: 0,
    count: 0
  }

  constructor() { }
  @Input() header: any;
  private _data: any;


  @Input() set data(value: any) {
    if (value) {
      this._data = value;
      // var header = value.header;
      var index_check_system = this.header.indexOf("isRefQK");
      var index_check_this = this.header.indexOf("myTest");
      this.details = {
        no_no: 0,
        no_err: 0,
        no_valid: 0,
        err_no: 0,
        valid_no: 0,
        err_this: 0, err_err: 0, valid_valid: 0, valid_err: 0, err_valid: 0,
        count: this._data.length
      }
      this._data.forEach((element: Array<any>) => {
        if (typeof (element[index_check_system]) == 'undefined' && typeof (element[index_check_this]) == 'undefined')
          this.details.no_no++;
        else {
          if (typeof (element[index_check_system]) == 'undefined' || typeof (element[index_check_this]) == 'undefined') {
            if (typeof (element[index_check_system]) == 'undefined')
              +element[index_check_this] == 0 ? this.details.no_err++ : this.details.no_valid++;
            if (typeof (element[index_check_this]) == 'undefined')
              +element[index_check_system] == 0 ? this.details.err_no++ : this.details.valid_no++;

          }
          else {
            if (+element[index_check_system] == 0 && +element[index_check_this] == 0)
              this.details.err_err++;
           else if (+element[index_check_system] == 1 && +element[index_check_this] == 1)
              this.details.valid_valid++;
          else  if (+element[index_check_system] == 1 && +element[index_check_this] == 0)
              this.details.valid_err++;
          else  if (+element[index_check_system] == 0 && +element[index_check_this] == 1)
              this.details.err_valid++;
          }
        }

      });
    }
  }



  get data() { return this._data; }
  ngOnInit(): void {

  }

}
