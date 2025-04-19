

from pathlib import Path
import datetime


if __name__ == "__main__":

    content = Path("/home/wueee/Downloads/export.gpx").read_text()

    points = []
    times = []

    for line in content.split("\n"):

        if "<trkpt lat" in line:

            parts = line.split()
            lat = float(parts[1].replace("lat=", "").replace("\"", "").replace(">", ""))
            lon = float(parts[2].replace("lon=", "").replace("\"", "").replace(">", ""))

            points.append((lat, lon))

        
        elif "<time>" in line:

            dt_string = line.strip().replace("<time>", "").replace("</time>", "")
            times.append(datetime.datetime.strptime(dt_string, "%Y-%m-%dT%H:%M:%S%z"))


    # points.append(points[0])
    # times.append(times[0])

    for i in range(len(points) - 1):

        p_prev = points[i]
        p_next = points[i + 1]
        t_prev = times[i]
        t_next = times[i + 1]

        t_delta = t_next - t_prev

        # { position: { lat: 50.0504406, lon: 14.4203278 }, timeToReachNext: 75 },
        print(f"{{ position: {{ lat: {p_prev[0]}, lon: {p_prev[1]} }}, timeToReachNext: {t_delta.seconds} }},")
    
    print(points[-1])