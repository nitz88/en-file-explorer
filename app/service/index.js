"use strict";
/* global angular, require */
angular
  .module("enFileExplorer")
  .factory("fileBrowserService", [
    "$filter",
    require("./enFileBrowser.service"),
  ]);
