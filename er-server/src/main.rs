use axum::{extract::Query, response::Json, routing::get, Router};
use chrono::{DateTime, TimeZone, Utc};
use geo::{HaversineBearing, Point};
use serde::{Deserialize, Serialize};

mod track;
use track::{build_small_track, get_point_on_track_at_time};


#[derive(Deserialize)]
struct Coordinates {
    latitude: f64,
    longitude: f64,
}

#[derive(Serialize, Deserialize)]
struct Bearing {
    bearing: f64
}


fn get_reset_origin() -> DateTime<Utc> {
    Utc.with_ymd_and_hms(2024, 1, 1, 0, 0, 0).unwrap()
}


fn build_router() -> Router {
    Router::new().route("/", get(get_bearing))
}

#[tokio::main]
async fn main() {
    // build our application with a route
    let router = build_router();

    // run it
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, router).await.unwrap();
}

async fn get_bearing(Query(params): Query<Coordinates>) -> Json<Bearing> {
    // let point = Point::new(40.7128, -74.0060); // New York City coordinates
    let user_point = Point::new(params.latitude, params.longitude);

    let reset_origin = get_reset_origin();

    let track = build_small_track();
    let target = get_point_on_track_at_time(&track, Utc::now(), reset_origin);

    let bearing_to_goal = user_point.haversine_bearing(target);

    Json(Bearing{bearing: bearing_to_goal})
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
        let actual = serde_json::from_str::<Bearing>(send_request_get_body(query).await.as_str()).unwrap();
        assert!(actual.bearing >= -180.);
        assert!(actual.bearing <= -90.);
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