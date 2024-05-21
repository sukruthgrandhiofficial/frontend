# Use a lightweight Nginx image
FROM nginx:alpine

# Copy the application files into the container
COPY src/index.html /usr/share/nginx/html/index.html
COPY src/styles.css /usr/share/nginx/html/styles.css
COPY src/script.js /usr/share/nginx/html/script.js
COPY src/loginscript.js /usr/share/nginx/html/loginscript.js
COPY src/env.js /usr/share/nginx/html/env.js

# Expose port 80
EXPOSE 80