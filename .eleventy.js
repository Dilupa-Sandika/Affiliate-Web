const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets that don't need processing
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  
  // Watch for changes in the compiled CSS file for live browser refreshes
  eleventyConfig.addWatchTarget("./_site/assets/css/");
  
  // Date filters
  eleventyConfig.addFilter("date", (dateObj, format) => {
    if (dateObj === "now") {
      return DateTime.now().toFormat(format);
    }
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });
  
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISO();
  });
  
  // URL filters
  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    try {
      return new URL(url, base).toString();
    } catch(e) {
      console.log(`Trying to convert ${url} to be an absolute url with base ${base} and failed.`);
      return url;
    }
  });
  
  // Collections (No changes needed here)
  eleventyConfig.addCollection("reviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/reviews/*.md");
  });
  
  eleventyConfig.addCollection("services", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/services/*.njk").filter(function(item) {
      return item.inputPath !== "./src/services/index.njk";
    });
  });
  
  // Global data (No changes needed here)
  eleventyConfig.addGlobalData("metadata", {
    title: "Smart Home Authority & Las Vegas Installation Services",
    url: "https://yourdomain.com",
    description: "Expert smart home device reviews and professional installation services in Las Vegas.",
    language: "en",
    author: "Smart Home Authority"
  });
  
  // Set directories (No changes needed here)
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};