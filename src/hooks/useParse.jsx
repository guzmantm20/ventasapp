export const useParse = () => {
  const parseNum = ({ num }) => {
    return parseInt(num)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const parseDate = ({date}) => {
    var day = date.getUTCDate(); 
    var month = ("0" + (date.getMonth() + 1)).slice(-2); 
    var year = date.getFullYear();
    return year+'-'+month+'-'+day
  }

  return {parseNum, parseDate}
};

