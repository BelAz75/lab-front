#!/bin/zsh

npm run build
zip -r dist.zip dist/
scp dist.zip virt_lab@40.117.187.181:~/
