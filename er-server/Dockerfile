# Use the official Rust image as the base image
FROM debian:bullseye-slim as builder

# Set the working directory to /app
WORKDIR /app

# Copy the local Cargo.toml and Cargo.lock to the container
COPY Cargo.toml .
COPY Cargo.lock .

# Create an empty src directory to trick Cargo into building dependencies first
RUN mkdir src && echo "fn main() {}" > src/main.rs

# Build dependencies
RUN apt-get update && apt-get install -y build-essential curl
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN cargo build --release

# Copy the entire local source code to the container
COPY . .

# Build the application
RUN cargo build --release

# Create a new stage for the minimal runtime environment
FROM debian:bullseye-slim

# Set the working directory to /app
WORKDIR /app

# Copy the binary from the builder stage to the current stage
COPY --from=builder /app/target/release/er-server /app/er-server

# Expose the port the application will run on
EXPOSE 8080

# Command to run the application
CMD ["/app/er-server"]