#!/usr/bin/env sh

# abort on errors
#set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git status
git checkout gh-pages
git add -A
git commit -m 'Deploy page'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push --set-upstream origin gh-pages

cd -

read  -n 1 -p "Input Selection:" mainmenuinput


# help, need stable way to auto push to gh-pages

#git init
#git status
#git add .
#git commit -m "message"
#git push --set-upstream origin main