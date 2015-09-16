#!/bin/bash
rm -rf site/docs
./node_modules/.bin/jsdoc ./src -r -c conf.json -d site/docs
