from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

def extract_geodata(image):
    img = Image.open(image)
    exif_data = {}
    try:
        info = img._getexif()
        if info:
            for tag, value in info.items():
                decoded = TAGS.get(tag, tag)
                if decoded == 'GPSInfo':
                    gps_data = {}
                    for t in value:
                        sub_decoded = GPSTAGS.get(t,t)
                        gps_data[sub_decoded] = value[t]

                    exif_data[decoded] = gps_data
                else:
                    exif_data[decoded] = value
    except:
        pass
    return exif_data

def get_if_exist(data, key):
    if key in data:
        return data[key]
    return None

def convert_to_degrees(value):
    d0 = value[0][0]
    d1 = value[0][1]
    d = float(d0)/float(d1)

    m0 = value[1][0]
    m1 = value[1][1]
    m = float(m0)/float(m1)

    s0 = value[2][0]
    s1 = value[2][1]
    s = float(s0)/float(s1)

    return d + (m/60.0) + (s/3600.0)

def get_lat_lng(exif_data):
    lat = 0
    lng = 0
    if "GPSInfo" in exif_data:
        gps_info = exif_data["GPSInfo"]

        gps_lat = get_if_exist(gps_info, "GPSLatitude")
        gps_lat_ref = get_if_exist(gps_info, "GPSLatitudeRef")
        gps_lng = get_if_exist(gps_info, "GPSLongitude")
        gps_lng_ref = get_if_exist(gps_info, "GPSLongitudeRef")

        if gps_lat and gps_lat_ref and gps_lng and gps_lng_ref:
            lat = convert_to_degrees(gps_lat)
            if gps_lat_ref != "N":
                lat = 0 - lat
            
            lng = convert_to_degrees(gps_lng)
            if gps_lng_ref != "E":
                lng = 0 - lng
            
    return lat, lng

    

# Credit to MIT and "erans" on github. I added slight changes to the code for my use.