export const sliceText=(text:any, number:number)=>{
    if( text.length < number){
        return text
    } else {
        return text.slice(0,number) + '...'
    }
}

export const calculateElapsedTime = (startDate: string): string => {
    const currentDate = new Date();
    const startDateObj = new Date(startDate);
  
    const timeDifferenceMilliseconds = currentDate.getTime() - startDateObj.getTime();
    const seconds = Math.floor(timeDifferenceMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 1) {
      return `${days} dni temu`;
    } else if (days === 1) {
      return `1 dzień temu`;
    } else if (hours > 1) {
      return `${hours} godzin temu`;
    } else if (hours === 1) {
      return `godzinę temu`;
    } else if (minutes > 1) {
      return `${minutes} minut temu`;
    } else {
      return `przed chwilą`;
    }
  };

  export const changeRouteName = (name: string) => {
    name = name.replace(/ /g, '-');
    name = name
      .replace(/ł/g, 'l')
      .replace(/ą/g, 'a')
      .replace(/ę/g, 'e')
      .replace(/ć/g, 'c')
      .replace(/ń/g, 'n')
      .replace(/ó/g, 'o')
      .replace(/ś/g, 's')
      .replace(/ź/g, 'z')
      .replace(/ż/g, 'z');
  
    let toLower = name.toLowerCase();
    return toLower;
  }
  