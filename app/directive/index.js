"use strict";
/* global require, angular */
angular
  .module("enFileExplorer")
  .directive("enFileBrowser", [
    "$timeout",
    "$filter",
    "fileBrowserService",
    require("./enFileBrowser.directive"),
  ]);
