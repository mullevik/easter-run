
use chrono::{DateTime, TimeDelta, Utc};
use geo::{GeodesicDistance, LineInterpolatePoint, LineString, Point};


type MS = i64;

#[derive(PartialEq, Debug)]
struct WayPoint {
    point: Point,
    timestamp: MS,
}

pub struct Track {
    waypoints: Vec<WayPoint>
}
impl Track {
    
    fn new(waypoints: Vec<WayPoint>) -> Self {
        if waypoints.is_empty() {
            panic!("Empty waypoints can not create a Track");
        } else {
            Track{waypoints: waypoints}
        }
    }

    fn duration(&self) -> MS {
        self.waypoints.iter().last().unwrap().timestamp
    }

    fn waypoint_before(&self, timestamp: MS) -> &WayPoint {
        match self.waypoints.iter().filter(|w| w.timestamp <= timestamp).last() {
            Some(before) => before,
            None => self.waypoints.iter().next().unwrap()
        }
    }

    fn waypoint_after(&self, timestamp: MS) -> &WayPoint {
        match self.waypoints.iter().filter(|w| w.timestamp > timestamp).next() {
            Some(after) => after,
            None => self.waypoints.last().unwrap()
        }
    }
}

fn get_latest_track_beginning(track: &Track, at: DateTime<Utc>, reset_at: DateTime<Utc>) -> DateTime<Utc> {
    let since_reset = at.signed_duration_since(reset_at);
    let n_rounds = since_reset.num_milliseconds() / track.duration();
    let completed_rounds_duration = n_rounds * track.duration();
    reset_at + TimeDelta::milliseconds(completed_rounds_duration)
}

pub fn get_signal_strength(from: Point, to: Point) -> i32 {
    // # Returns
    // Signal strength: value 0 - 10 where 0 is the lowest signal strength and 10 the strongest.
    // 
    // If further than 100 meters, 0 is returned.
    // 
    // If closer than 10 meters, 10 is returned.
    let dist = from.geodesic_distance(&to);
    if dist.is_nan() {
        return 0
    }

    if dist > 100. {
        return 0
    }

    10 - (dist / 10.).floor() as i32
}

pub fn get_point_on_track_at_time(track: &Track, at: DateTime<Utc>, reset_at: DateTime<Utc>) -> Point {
    
    let latest_track_beginning = get_latest_track_beginning(track, at, reset_at);
    let since_latest_beginning = at.signed_duration_since(latest_track_beginning);

    let latest_waypoint = track.waypoint_before(since_latest_beginning.num_milliseconds());
    let upcoming_waypoint = track.waypoint_after(since_latest_beginning.num_milliseconds());

    let line: LineString = vec![
        [latest_waypoint.point.x(), latest_waypoint.point.y()],
        [upcoming_waypoint.point.x(), upcoming_waypoint.point.y()]
    ].into();

    let line_duration: MS = upcoming_waypoint.timestamp - latest_waypoint.timestamp;
    let since_latest_waypoint: MS = since_latest_beginning.num_milliseconds() - latest_waypoint.timestamp;

    let interpolation_fraction = since_latest_waypoint as f64 / line_duration as f64;

    line.line_interpolate_point(interpolation_fraction).unwrap_or(latest_waypoint.point)
}

pub fn build_small_track() -> Track {
    let start = Point::new(14.425202, 50.061495);  // Prague: near Vysehrad
    let middle = Point::new(14.431561, 50.058621);  // Prague: near Prazskeho Povstani
    let waypoints = vec![
        WayPoint{point: start, timestamp: 0},
        WayPoint{point: middle, timestamp: 3 * 60 * 1000},
        WayPoint{point: start, timestamp: 6 * 60 * 1000},
    ];
    Track::new(waypoints)
}


#[cfg(test)]
mod tests {
    use geo::HaversineBearing;

    use super::*;

    #[test]
    fn test_track() {
        let track = build_small_track();
        
        let first = WayPoint{point: Point::new(14.425202, 50.061495), timestamp: 0};
        let second = WayPoint{point: Point::new(14.431561, 50.058621), timestamp: 3 * 60 * 1000};
        let third = WayPoint{point: Point::new(14.425202, 50.061495), timestamp:  6 * 60 * 1000};


        assert_eq!(track.duration(), 6 * 60 * 1000);
        
        assert_eq!(track.waypoint_before(-30), &first);
        assert_eq!(track.waypoint_before(0), &first);
        assert_eq!(track.waypoint_before(666), &first);
        assert_eq!(track.waypoint_before(5 * 60 * 1000), &second);
        assert_eq!(track.waypoint_before(60 * 60 * 1000), &third);

        assert_eq!(track.waypoint_after(-30), &first);
        assert_eq!(track.waypoint_after(0), &second);
        assert_eq!(track.waypoint_after(666), &second);
        assert_eq!(track.waypoint_after(5 * 60 * 1000), &third);
        assert_eq!(track.waypoint_after(60 * 60 * 1000), &third);
    }

    #[test]
    fn test_point_on_track_at_time() {
        let track = build_small_track();
        let now = Utc::now();
        
        let first_point = Point::new(14.425202, 50.061495);
        let second_point = Point::new(14.431561, 50.058621);

        assert_eq!(get_point_on_track_at_time(&track, now, now), first_point);
        assert_eq!(get_point_on_track_at_time(&track, now + TimeDelta::milliseconds(3 * 60 * 1000), now), second_point);
        assert_eq!(get_point_on_track_at_time(&track, now + TimeDelta::milliseconds(6 * 60 * 1000), now), first_point);
        assert_eq!(get_point_on_track_at_time(&track, now + TimeDelta::milliseconds(999 * 6 * 60 * 1000), now), first_point);

        let in_between = get_point_on_track_at_time(&track, now + TimeDelta::milliseconds(90 * 1000), now);
        assert!(in_between.x() < second_point.x());
        assert!(in_between.x() > first_point.x());

        assert!(in_between.y() > second_point.y());
        assert!(in_between.y() < first_point.y());
    }

    #[test]
    fn test_bearing() {
        let mid = Point::new(14., 50.);
        let n = Point::new(14., 51.);
        let w = Point::new(13., 50.);
        let s = Point::new(14., 49.);
        let e = Point::new(15., 50.);

        assert!(f64::abs(mid.haversine_bearing(n) - 0.) < 1.);
        assert!(f64::abs(mid.haversine_bearing(w) - -90.) < 1.);
        assert!(f64::abs(mid.haversine_bearing(s) - 180.) < 1.);
        assert!(f64::abs(mid.haversine_bearing(e) - 90.) < 1.);
    }

    #[test]
    fn test_limits_of_geodesic_distance() {
        let _tokyo = Point::new(35.689487, 139.691706);
        let _berlin = Point::new(52.520007, 13.404954);
        let huge_dist = _tokyo.geodesic_distance(&_berlin);
        assert!(huge_dist.is_nan());
    }

    #[test]
    fn test_signal_strength() {
        let a = Point::new(50.72431, 15.17108);
        let b = Point::new(50.061495, 14.425202);
        let close_to_b = Point::new(50.0614, 14.4252);
        let _tokyo = Point::new(35.689487, 139.691706);
        let _berlin = Point::new(52.520007, 13.404954);

        assert_eq!(get_signal_strength(a, b), 0);
        assert_eq!(get_signal_strength(a, a), 10);
        assert_eq!(get_signal_strength(b, close_to_b), 9);
        assert_eq!(get_signal_strength(_tokyo, _berlin), 0);
    }

}