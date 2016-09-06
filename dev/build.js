'use strict';

const Promise = require('bluebird');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ora = require('ora');

const Logger = require('../logger');

function bundle() {

  return new Promise(function(resolve, reject) {

    const webpackConfig = require('../webpack');
    Logger.info('Started compiling');
    const spinner = ora('Running webpack');
    spinner.color = 'yellow';
    spinner.start();

    const config = webpackConfig();

    config.plugins.push(new ProgressPlugin( (percentage, msg) => {

      const percent = percentage * 100;

      if (percent % 20 === 0 && msg !== null && msg !== undefined && msg !== ''){
        spinner.text = `Webpack ${msg}`;
      }

    }));

    webpack(config).run((err, stats) => {

      if (err) {
        spinner.fail();
        Logger.failed('Failed compiling');
        reject(err);
      }

      spinner.stop();

      const statistics = stats.toString({
        colors: true,
        cached: true,
        reasons: false,
        source: false,
        chunks: false,
        children: false
      });

      Logger.info(statistics);
      Logger.ok('Finished compiling');
      resolve();

    });

  });

}

module.exports = bundle;
