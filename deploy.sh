#!/bin/bash

git branch -f master
git checkout master
git reset --hard origin/gh-pages
yarn export
cp -r out/* .
touch .nojekyll
git add -A .
git commit -a -m 'chore: deploy new production version'
git push origin master --force
git checkout gh-pages
