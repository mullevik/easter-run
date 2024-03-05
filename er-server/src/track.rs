
use chrono::{DateTime, TimeDelta, Utc};
use geo::{LineInterpolatePoint, LineString, Point};


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
        let third = WayPoint{point: Point::new(50.061495, 14.425202), timestamp:  6 * 60 * 1000};


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
        
        let first_point = Point::new(50.061495, 14.425202);
        let second_point = Point::new(50.058621, 14.431561);

        assert_eq!(get_point_on_track_at_time(&track, now, now), first_point);
        assert_eq!(get_point_on_track_at_time(&track, now + TimeDelta::milliseconds(3 * 60 * 1000), now), second_point);
        assert_eq!(get_point_on_track_at_time(&track, now + TimeDelta::milliseconds(6 * 60 * 1000), now), first_point);
        assert_eq!(get_point_on_track_at_time(&track, now + TimeDelta::milliseconds(999 * 6 * 60 * 1000), now), first_point);

        let in_between = get_point_on_track_at_time(&track, now + TimeDelta::milliseconds(90 * 1000), now);
        assert!(in_between.x() > second_point.x());
        assert!(in_between.x() < first_point.x());

        assert!(in_between.y() < second_point.y());
        assert!(in_between.y() > first_point.y());
    }

    fn build_small_track() -> Track {
        let start = Point::new(50.061495, 14.425202);  // Prague: near Vysehrad
        let middle = Point::new(50.058621, 14.431561);  // Prague: near Prazskeho Povstani
        let waypoints = vec![
            WayPoint{point: start, timestamp: 0},
            WayPoint{point: middle, timestamp: 3 * 60 * 1000},
            WayPoint{point: start, timestamp: 6 * 60 * 1000},
        ];
        Track::new(waypoints)
    }
}