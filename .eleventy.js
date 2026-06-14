const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('src/styles/site.css');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/styles');
  eleventyConfig.addPassthroughCopy('src/scripts');

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  eleventyConfig.addFilter('markdown', (content = '') => md.render(content));

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_site',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
