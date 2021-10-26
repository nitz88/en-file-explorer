/* global module */
function offSetFilter() {
  return function (allData, offsetValue) {
    return allData.slice(Number.parseInt(offsetValue, 10));
  };
}

module.exports = offSetFilter;
