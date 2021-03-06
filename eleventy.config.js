// @see https://www.11ty.io/docs/config/

// Standard lib.
import {
  join as joinPath,
  relative as relativePath
} from 'path';

// Local modules.
import { config } from './package.json';
import inspect from './lib/filters';
import NunjucksLinkExtension from './lib/nunjucks/tags/link';

// Constants.
const INPUT_DIRECTORY = config.input;
// const INTERMEDIATE_DIRECTORY = config.intermediate;
// const OUTPUT_DIRECTORY = config.output;

// Exports.
module.exports = (eleventyConfig) => {
  // Add universal filters.
  // @see https://www.11ty.io/docs/filters/
  eleventyConfig.addFilter('debug', inspect);

  // Add custom tags.
  // @see https://www.11ty.io/docs/shortcodes/
  eleventyConfig.addNunjucksTag('link', NunjucksLinkExtension.singleton);

  // Copy static assets.
  eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '*.txt'));

  // Return configuration options.
  // @see https://www.11ty.io/docs/config/
  return {
    // @see https://www.11ty.io/docs/config/#input-directory
    dir: {
      layouts: relativePath(INPUT_DIRECTORY, joinPath(INPUT_DIRECTORY, '_layouts/'))
    },

    // @see https://www.11ty.io/docs/config/#default-template-engine-for-markdown-files
    markdownTemplateEngine: 'njk'
  };
};
