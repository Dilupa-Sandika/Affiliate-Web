const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets that don't need processing
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js"); // Correctly copies your JS files
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
  
  // Additional filters for blog functionality
  eleventyConfig.addFilter("wordcount", (content) => {
    const words = content.split(/\s+/).filter(word => word.length > 0);
    return words.length;
  });
  
  eleventyConfig.addFilter("striptags", (content) => {
    return content.replace(/<[^>]*>/g, '');
  });
  
  eleventyConfig.addFilter("truncate", (text, length = 100) => {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
  });
  
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
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
  
  // Collections
  eleventyConfig.addCollection("reviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/reviews/*.md");
  });
  
  eleventyConfig.addCollection("services", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/services/*.njk").filter(function(item) {
      return item.inputPath !== "./src/services/index.njk";
    });
  });
  
  // Blog collection - all posts from blog directory sorted by date (newest first)
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/blog/*.md")
      .filter(function(item) {
        return item.inputPath !== "./src/blog/index.njk"; // Exclude the main blog index page
      })
      .sort(function(a, b) {
        return b.date - a.date; // Sort by date descending (newest first)
      });
  });
  
  // Global data
  eleventyConfig.addGlobalData("metadata", {
    title: "Vegas Tech Hub & Las Vegas Installation Services",
    url: "https://lasvegashometech.netlify.app", // Updated to match your domain
    description: "Real tech experiences and professional installation services in Las Vegas. Personal problem-solving stories from Vegas homeowners.",
    language: "en",
    author: "Vegas Tech Hub"
  });
  
  // Set directories
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