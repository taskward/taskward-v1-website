#!/bin/bash

set -o allexport
source .env.production.local
set +o allexport

pnpm i
pnpm build
echo "正在上传静态资源至 $SERVER_IP"
scp -r dist "$SERVER_USER"@"$SERVER_IP":/usr/share/nginx/html/taskward-v1/
echo "成功部署至 $SERVER_IP"
