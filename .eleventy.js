const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy({ "node_modules/three/build/three.module.js": "assets/js/three.module.js" });
  eleventyConfig.addPassthroughCopy({ "node_modules/gsap/dist/gsap.min.js": "assets/js/gsap.min.js" });
  
  // Generate optimized CSS using a transform
  eleventyConfig.addTransform("tailwindcss", async function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // This is a placeholder - in production, you'd use PostCSS to process Tailwind
      return content;
    }
    return content;
  });
  
  // Watch files for changes
  eleventyConfig.addWatchTarget("./src/assets/css/");
  eleventyConfig.addWatchTarget("./src/assets/js/");
  
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
  
  // Collections
  eleventyConfig.addCollection("reviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/reviews/*.md");
  });
  
  eleventyConfig.addCollection("services", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/services/*.njk").filter(function(item) {
      return item.inputPath !== "./src/services/index.njk";
    });
  });
  
  // Global data
  eleventyConfig.addGlobalData("metadata", {
    title: "Smart Home Authority & Las Vegas Installation Services",
    url: "https://yourdomain.com",
    description: "Expert smart home device reviews and professional installation services in Las Vegas.",
    language: "en",
    author: "Smart Home Authority"
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