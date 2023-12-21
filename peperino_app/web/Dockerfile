# Use the official Flutter image as the base image
FROM ghcr.io/cirruslabs/flutter:3.16.4 as build

# Create and set the working directory
WORKDIR /app

# Copy the Flutter app files to the container
COPY . .

RUN flutter pub upgrade

# Build the Flutter web app
RUN flutter build web

FROM nginx:alpine as final

WORKDIR /usr/share/nginx/html

# Copy only the built artifacts from the previous stage
COPY --from=build /app/build/web .

# Command to run NGINX and serve the Flutter web app
CMD ["nginx", "-g", "daemon off;"]