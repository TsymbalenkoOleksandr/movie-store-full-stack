/**
 * @param  {plain text string} text - loaded .txt file
 * @return {array} resArr - array of {object} movies
 */
export function convert(text) {
  const resArr = [];
  const midArr = text.split('\n\n')
    .map(item => item.split('\n')
      .map(item => item.split(': '))
    );
  midArr.forEach(item => {
    if (item[3]) {
      const resObj = {
        title: item[0][2] 
          ? item[0].slice(1, item[0].length).join(': ')
          : item[0][1],
        year: parseInt(item[1][1], 10),
        format: item[2][1],
        stars: item[3][1]
      };
      resArr.push(resObj);
    }
  });

  return resArr;
}
