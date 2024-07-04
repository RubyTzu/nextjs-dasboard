function dateToFormate(date:any){
    const dateObj = new Date();
    const year = String(dateObj.getUTCFullYear());
    let dateArray:any = date.split('T') //['2024-05-28','00:00:00.000Z']
    dateArray = dateArray[0].split('-') //['2024','05','28']
    let formateDate
    if (dateArray[0] === year) {
      formateDate = `${dateArray[1]}月${dateArray[2]}日`;
    } else {
      formateDate = `${dateArray[0]}年${dateArray[1]}月${dateArray[2]}日`;
    }
    return formateDate
  }

  
export { dateToFormate };