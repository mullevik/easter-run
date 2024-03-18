FROM rust:1.76-slim-bullseye as build

RUN USER=root cargo new --bin er-server
WORKDIR /er-server

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

RUN cargo build --release & rm src/*.rs

COPY ./src ./src

RUN cargo build --release

FROM rust:1.76-slim-bullseye

COPY --from=build /er-server/target/release/er-server .

ENV RUST_LOG=info

CMD ["./er-server"]
EXPOSE 8080