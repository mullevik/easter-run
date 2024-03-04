
use chrono::{DateTime, TimeDelta, Utc};
use geo::{Line, LineInterpolatePoint, LineString, Point};


type MS = i64;

#[derive(PartialEq, Debug)]
struct WayPoint {
    point: Point,
    timestamp: MS,
}

struct Track {
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

fn get_point_on_track_at_time(track: &Track, at: DateTime<Utc>, reset_at: DateTime<Utc>) -> Point {
    
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


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_track() {
        let track = build_small_track();
        
        let first = WayPoint{point: Point::new(50.061495, 14.425202), timestamp: 0};
        let second = WayPoint{point: Point::new(50.058621, 14.431561), timestamp: 3 * 60 * 1000};


        assert_eq!(track.duration(), 3 * 60 * 1000);
        
        assert_eq!(track.waypoint_before(-30), &first);
        assert_eq!(track.waypoint_before(0), &first);
        assert_eq!(track.waypoint_before(666), &first);
        assert_eq!(track.waypoint_before(666 * 1000), &second);

        assert_eq!(track.waypoint_after(-30), &first);
        assert_eq!(track.waypoint_after(0), &second);
        assert_eq!(track.waypoint_after(666), &second);
        assert_eq!(track.waypoint_after(666 * 1000), &second);
    }

    #[test]
    fn test_point_on_track_at_time() {
        let track = build_small_track();

        todo!("test this")
    }

    fn build_small_track() -> Track {
        let start = Point::new(50.061495, 14.425202);  // Prague: near Vysehrad
        let end = Point::new(50.058621, 14.431561);  // Prague: near Prazskeho Povstani
        let waypoints = vec![
            WayPoint{point: start, timestamp: 0},
            WayPoint{point: end, timestamp: 3 * 60 * 1000}
        ];
        Track{waypoints: waypoints}
    }
}