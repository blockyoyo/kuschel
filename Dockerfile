# Simple static site server - serves pre-built dist folder
FROM nginx:alpine

# Copy the pre-built dist folder (committed to git)
COPY dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
