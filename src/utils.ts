export function formatImdbIDToRupiahList(imdbID: string) {
    const firstFiveDigits = imdbID.slice(2, 8);
    const numberPart = Number(firstFiveDigits);
    console.log(numberPart < 100000);
    if (numberPart < 100000) {
      const rupiahFormat = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(100000);
      return rupiahFormat;
    } else if (numberPart > 100000) {
      const rupiahFormat = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(numberPart);
      return rupiahFormat;
    }
  }

  export function formatImdbIDToRupiahCart(imdbID: number) {
    const rupiahFormat = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(imdbID);
      return rupiahFormat;
  }

 export function rupiahToNumber(rupiah:any) {
    // Remove "Rp " and all commas
    const numericString = rupiah.replace(/[^0-9,-]/g, '');
  
    // Replace the last comma with a decimal point
    const replacedString = numericString.replace(/,([^,]*)$/, '.$1');
  
    // Convert to a number
    const rupiahNumber = parseFloat(replacedString);
  
    return rupiahNumber;
  }