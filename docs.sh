#!/bin/bash
rm -rf docs
./node_modules/.bin/jsdoc ./src -r -c conf.json -d docs
