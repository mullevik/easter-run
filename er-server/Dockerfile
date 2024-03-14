FROM rust:alpine
WORKDIR /er-server
RUN apk add --no-cache musl-dev

# todo:
# this uses the new buildKit ... learn more!
# this does not optimize the toml.lock cache I think...
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    <<EOF
set -e
cargo build --locked --release
EOF

CMD ["/er-server/target/release/er-server"]
EXPOSE 8080