import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filer'
})
export class FilerPipe implements PipeTransform {

  transform(allProducts: any[],searchTerm:string,propertyName:string): any[] {
    const result:any[]=[];

    if (!allProducts||searchTerm==''||propertyName=='') {
      
      return allProducts;
    }
    allProducts.forEach((item:any)=>{
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLocaleLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
