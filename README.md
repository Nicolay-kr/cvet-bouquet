# cvet-bouquet
Flowers shop

Deploy steps:

1. Setup NextJS on Ubuntu server Terminal Commands
#based on my YouTube video

#login to server
ssh root@ip_address

#Upgrade Server
sudo apt update && sudo apt upgrade

#Install NGINX and Certbot
sudo apt install nginx certbot python3-certbot-nginx

#Allow Firewall Access
sudo ufw allow "Nginx Full"
ufw allow OpenSSH
ufw enable

#Install NPM
apt install npm

#Install pm2
npm install -g pm2

#Check pm2 is working
pm2 status

#go to www root
cd /var/www

#install nvm and nodejs
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
exec $SHELL
nvm install --lts

#Create NextJS App or clone here
npx create-next-app@latest name_of_app

#Go inside new app directory
cd name_of_app

#(if you cloned the repo from somewhere else, make sure to npm install first
npm install)

#Create .env file in cvet-bouquet-fe folder with next Environment Variables

SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=

<!-- credentials for Assist -->
<!-- SERVER_NAME=https://test.paysec.by/pay/order.cfm -->
SERVER_NAME=https://test.paysec.by/pay/order.cfm
MERCHANT_ID=

<!-- email to receve information about orders -->
EMAIL=
EMAIL_PASS=

TELEGRAM_TOKEN=

<!-- base site url for -->
MAIN_URL=


#Build it
npm run build

#Create NGINX config file and edit it
cd /etc/nginx/sites-available
touch name_of_app
nano name_of_app

[SEE OTHER GIST FOR CONFIG FILE CONTENTS] 
#https://gist.github.com/oelbaga/5019647715e68815c602ff05cff2416e#file-ubuntu-nextjs-nginx-config-file

#Option1 Syslink the file in sites-enabled
sudo ln -s /etc/nginx/sites-available/name_of_app /etc/nginx/sites-enabled/name_of_app

#Option 2 No need to use sites-enabled
nano /etc/nginx/nginx.conf  
change  include /etc/nginx/sites-enabled/*; to  include /etc/nginx/sites-available/*;

#make Sure NGINX file is good
nginx -t

#remove the default config files
cd /etc/nginx/sites-available
rm default
cd /etc/nginx/sites-enabled
rm default

#restart NGINX to reload config files
systemctl restart nginx

#Go to site directory and launch it with pm2
cd /var/www/name_of_app

#launch app with pm2
pm2 start npm --name name_of_app -- start

#Create SSL with letsencryot
sudo certbot --nginx -d domainname.com



————— helpful commands ————
pm2 start npm --name name_of_app -- start  (make sure you're inside the site's directory first)
systemctl restart nginx (restart NGINX)
sudo certbot --nginx -d domainname.com (Add SSL)


#nginx config file for Nextjs App
#place in /etc/nginx/sites-available/name_of_config_file
server {
        listen 80;
        server_name domainname.com;

        gzip on;
        gzip_proxied any;
        gzip_types application/javascript application/x-javascript text/css text/javascript;
        gzip_comp_level 5;
        gzip_buffers 16 8k;
        gzip_min_length 256;

        location /_next/static/ {
                alias /var/www/name_of_app/.next/static/;
                expires 365d;
                access_log off;
        }

        location / {
                proxy_pass http://127.0.0.1:3000; #change to 3001 for second app, but make sure second nextjs app starts on new port in packages.json "start": "next start -p 3001",
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}








