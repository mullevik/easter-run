use log::info;
use axum::{extract::Query, response::Json, routing::get, Router};
use chrono::{DateTime, TimeZone, Utc};
use geo::{HaversineBearing, Point};
use serde::{Deserialize, Serialize};
use tower_http::cors::CorsLayer;
mod track;
use track::{build_small_track, get_point_on_track_at_time, get_signal_strength};


#[derive(Deserialize)]
struct Coordinates {
    latitude: f64,
    longitude: f64,
}

#[derive(Debug, Serialize, Deserialize)]
struct Signal {
    bearing: f64,
    strength: i32,
}


fn get_reset_origin() -> DateTime<Utc> {
    Utc.with_ymd_and_hms(2024, 1, 1, 0, 0, 0).unwrap()
}


fn build_router() -> Router {
    Router::new().route("/", get(get_signal))
}

#[tokio::main]
async fn main() {
    env_logger::init();

    let quit_sig = async {
        _ = tokio::signal::ctrl_c().await;
       info!("SIGTERM detected - shutting down")
    };
    
    let router = build_router().layer(CorsLayer::permissive());
    
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080")
        .await
        .unwrap();
    info!("server listens on {}", listener.local_addr().unwrap());
    axum::serve(listener, router).with_graceful_shutdown(quit_sig).await.unwrap();
}

async fn get_signal(Query(params): Query<Coordinates>) -> Json<Signal> {
    // let point = Point::new(40.7128, -74.0060); // New York City coordinates
    let user_point = Point::new(params.longitude, params.latitude);

    let reset_origin = get_reset_origin();

    let track = build_small_track();
    let target = get_point_on_track_at_time(&track, Utc::now(), reset_origin);

    let bearing_to_target = user_point.haversine_bearing(target);
    let signal_strength = get_signal_strength(user_point, target);

    Json(Signal{bearing: bearing_to_target, strength: signal_strength})
}


#[cfg(test)]
mod tests {
    use axum::{body::Body, http::Request};
    use http_body_util::BodyExt;
    use tower::ServiceExt;

    use super::*;


    #[tokio::test]
    async fn test_bearing_api() {
        let query = "latitude=50.72431&longitude=15.17108";  // Jablonec nad Nisou
        let actual = serde_json::from_str::<Signal>(send_request_get_body(query).await.as_str()).unwrap();
        println!("{actual:?}");
        assert!(actual.bearing >= -180.);
        assert!(actual.bearing <= -90.);
        assert_eq!(actual.strength, 0);
    }

    async fn send_request_get_body(query: &str) -> String {
        let body = build_router()
            .oneshot(
                Request::builder()
                    .uri(format!("/?{query}"))
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap()
            .into_body();
        let bytes = body.collect().await.unwrap().to_bytes();
        String::from_utf8(bytes.to_vec()).unwrap()
    }
}