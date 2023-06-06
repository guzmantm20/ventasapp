export const useParse = () => {
  const parseNum = ({ num }) => {
    return parseInt(num)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return {parseNum}
};

