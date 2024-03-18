FROM rust:1.76-slim-bullseye as build

RUN USER=root cargo new --bin er-server
WORKDIR /er-server

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

RUN cargo build --release & rm src/*.rs

COPY ./src ./src

# RUN rm ./target/release/deps/er-server*
RUN cargo build --release

FROM rust:1.76-slim-bullseye

# RUN apt update && apt install libc6

COPY --from=build /er-server/target/release/er-server .

CMD ["./er-server"]
EXPOSE 8080