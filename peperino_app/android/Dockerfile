# Use the official Flutter image as the base image
FROM ghcr.io/cirruslabs/flutter:3.16.4 as build

# Create and set the working directory
WORKDIR /app

# Copy the Flutter app files to the container
COPY . .

RUN flutter clean
RUN flutter pub get
RUN flutter pub upgrade

# Build the Flutter android app
RUN flutter build apk --release

RUN jarsigner -verify -verbose -certs ./build/app/outputs/flutter-apk/app-release.apk

FROM nginx:alpine as final

WORKDIR /usr/share/nginx/html

# Copy only the built artifacts from the previous stage
COPY --from=build /app/build/app/outputs/apk/release/output-metadata.json .
COPY --from=build /app/build/app/outputs/flutter-apk .

# Command to run NGINX and serve the Flutter web app
CMD ["nginx", "-g", "daemon off;"]