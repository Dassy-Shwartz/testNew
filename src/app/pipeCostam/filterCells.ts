import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCells'
})
export class FilterCellsPipe implements PipeTransform {
  transform(value: any[], ...args: any[]): any {
    if (args[0] && args[1] && args[2]) {
      const selectedIssueTab = args[0];
      const issueTabs1 = args[1];
      const issueTabs2 = args[2];
      return value.filter(
        item =>
          (item.length > 0 && selectedIssueTab === issueTabs1) ||
          selectedIssueTab === issueTabs2
      );
    }
    return value;
  }
}