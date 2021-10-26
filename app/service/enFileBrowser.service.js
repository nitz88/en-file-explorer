/* global module */
function fileBrowserFactory() {
  var allData = [];
  return {
    addFolder: function (folderObj) {
      allData.push(folderObj);
      return allData;
    },
    addFiles: function (fileObj) {
      allData.push(fileObj);
      return allData;
    },
    getFilterOption: function () {
      return [
        {
          label: "Filter By",
          value: "all",
        },
        {
          label: "By Directory Name",
          value: "directory",
        },
        {
          label: "By File Name",
          value: "file",
        },
      ];
    },
  };
}
module.exports = fileBrowserFactory;
