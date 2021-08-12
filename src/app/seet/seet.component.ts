import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
const bef_num = ['תקנות', 'תקנה', 'סימן', 'סעיף', 'חלק', 'סעיפים', 'ו־', 'פרק'];

type AOA = any[][];
@Component({
  selector: 'app-seet',
  templateUrl: './seet.component.html',
  styleUrls: ['./seet.component.css']
})
export class SeetComponent implements OnInit {
  numCheck: number=0;


  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
    progress_: number =0;
  data_: AOA = []; // [[1, 2], [3, 4]];
  data: AOA = []; // [[1, 2], [3, 4]];
  // [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'buffer' };
  fileName: string = 'SheetJS.xlsx';
  headers: any = [];
  curData: any;
  // @Output() arrData_display = new EventEmitter();
  refreshData(arrData:any) {debugger
    this.curData =arrData;
   
  }
  onFileChange(evt: any) {
    this.progress_=1;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.headers = this.data[0];
      this.headers.push('myTest');
      this.data.splice(0, 1)
      // console.log(this.headers);
      // console.log(this.data);
      this.checkData();

      // console.log(this.headers);
      // console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  checkData() {
    
    // this.ref.detectChanges();
    // this.numCheck=0;
    debugger;
    var data_on: AOA = [];
    var num_RefRelevant = 0, num_TitleRelevant = 0;
    var num_error = 0, num_valid = 0;
    var ref_index = this.headers.indexOf('ref');
    var title_index = this.headers.indexOf('title');
    var isTitleRefRelevant_index = this.headers.indexOf('isTitleRefRelevant');
    var IsTitleRelevant_index = this.headers.indexOf('IsTitleRelevant');
    // this.data.forEach(element => {
      for (let i = 0; i < this.data.length; i++) {
        var  element = this.data[i];
        
      
      // this.numCheck++;this.ref.detectChanges();
      if(!element.length){
    break;
      }
        var a =Object.assign([], element)
      let noCheck = false;//דגל כשלא רלוונטי
      //ref לא רלוונטי
      if (+element[isTitleRefRelevant_index] == 0) {
        noCheck = true; num_RefRelevant++;
        element.push(undefined);
        a.push(undefined); 
        data_on.push(a);
      }
      //title לא רלוונטי
      if (+element[IsTitleRelevant_index] == 0) {
        noCheck = true; num_TitleRelevant++;  element.push(undefined);
        a.push(undefined);
        data_on.push(a);
      }
      if (noCheck)
        continue;
      //אם אחד מכיל את המילה חוק ואחד לפקודת
      if ((element[title_index].indexOf('פקוד') != -1 && element[ref_index].indexOf('חוק') != -1) ||
        (element[title_index].indexOf('חוק') != -1 && element[ref_index].indexOf('פקוד') != -1)) {
        num_error++;
        element.push("0");
        a.push("0"); 
        data_on.push(a);
        continue;
      }
      //       //אם אחד מכיל את המילה חוק
      //       if ((element[title_index].indexOf('חוק') == -1 && element[ref_index].indexOf('חוק') != -1) || 
      //       (element[title_index].indexOf('חוק') != -1 && element[ref_index].indexOf('חוק') == -1)) {
      // degelNoChok=1;
      //       }
      //אם מכיל יותר ממילה שמורה אחת
      var kind_sum_ref = bef_num.filter(a => element[ref_index].indexOf(a) != -1);
      var kind_sum_title = bef_num.filter(a => element[title_index].indexOf(a) != -1);
  
      var arr_kind = kind_sum_title.length > kind_sum_ref.length ? kind_sum_title : kind_sum_ref;
      for (let index = 0; index < arr_kind.length; index++) {
        var kind_ref, kind_title;
        if (kind_sum_title.length <= 1 && kind_sum_ref.length <= 1) {
          kind_ref = kind_sum_ref[index];
          kind_title = kind_sum_title[index];
        }
        else {
          kind_ref = arr_kind[index];
          kind_title = arr_kind[index];
        }

        let flag_ref = 1;
        //לשמירה על התוכן- עזר
        var ref_temp = element[ref_index];
        //חיפוש שלא ימצא סעיף קטן
        while (kind_ref && flag_ref) {
          var num_ref_b = ref_temp.search(kind_ref);
          //אם מצא סעיף קטן שיחפש אחר
          var dd = ref_temp.substring(num_ref_b + kind_ref.length + 1, ref_temp.length)
          if (kind_ref && (dd.indexOf('קטן') == 0 || (dd.indexOf('(') == 0) || (dd.indexOf(')') == 0))) {
            ref_temp = ref_temp.substring(num_ref_b + kind_ref.length + 1, ref_temp.length);
            kind_ref = bef_num.find(a => ref_temp.indexOf(a) != -1);
          }
          else {
            flag_ref = 0;//מצא סעיף לא קטן
          }

        }
        let flag_title = 1;
        //לשמירה על התוכן- עזר
        var title_temp = element[title_index];
        //חיפוש שלא ימצא סעיף קטן
        while (kind_title && flag_title) {
          var num_title_b = title_temp.search(kind_title);
          //אם מצא סעיף קטן שיחפש אחר
          var dd = title_temp.substring(num_title_b + kind_title.length + 1, title_temp.length)
          if (kind_title && (dd.indexOf('קטן') == 0 || (dd.indexOf('(') == 0) || (dd.indexOf(')') == 0))) {
            title_temp = title_temp.substring(num_title_b + kind_title.length + 1, title_temp.length);
            kind_title = bef_num.find(a => title_temp.indexOf(a) != -1);
          }
          else {
            flag_title = 0;//מצא סעיף לא קטן
          }

        }
        if (kind_ref && kind_title) {

          var subString_ref = ref_temp;
          var subString_title = title_temp;
          if (kind_ref) {

            var num_ref_b = ref_temp.search(kind_ref);
            kind_ref == 'ו־' ? kind_ref = 'ו' : '';
            //חותכת עד תחילה מס החוק
            subString_ref = ref_temp.substring(num_ref_b + kind_ref.length + 1, ref_temp.length);

          }

          if (kind_title) {

            var num_title_b = title_temp.search(kind_title);  //חותכת עד תחילה מס החוק
            kind_title == 'ו־' ? kind_title = 'ו' : '';
            subString_title = title_temp.substring(num_title_b + kind_title.length + 1, title_temp.length)
          }



          var num_ref_e = subString_ref.search(/['׳',' ','(',')','#',"'"]/);
          var num_title_e = subString_title.search(/['׳',' ','(',')','#',"'"]/);
          //חותכת את הסוף
          num_title_e != -1 ? subString_title = subString_title.substring(0, num_title_e) : '';
          num_ref_e != -1 ? subString_ref = subString_ref.substring(0, num_ref_e) : '';
          // console.log(subString_title);
          // console.log(subString_ref);
          //אם תקין
          if ((!subString_title.length && !subString_ref.length) || (subString_title.length && subString_ref.length && subString_title == subString_ref)) {

          }

          //אם שגוי
          else {
            a.push("0")
            element.push("0");
            num_error++;
            data_on.push(a); 
            continue;
          }
        }
        // else {
        //   a.push("תקין")
        //   element.push("תקין");
        //   num_valid++;
        // }
      }

      a.push("1")
      element.push("1");
      num_valid++;
      data_on.push(a);
    
    };this.progress_=0;
    this.data_=data_on;this.ref.detectChanges();
    this.refreshData(this.data_);
    
  }
  export(): void {
    /* generate worksheet */
    var a=this.data_;
    a.unshift(this.headers)
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(a);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
