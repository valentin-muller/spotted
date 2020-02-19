function registerHelpers(hbsModule) {
  //Date time format
  hbsModule.registerHelper("dateFormat", require("handlebars-dateformat"));
}
module.exports = registerHelpers;
