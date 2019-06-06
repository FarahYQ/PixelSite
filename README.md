# PixelSite

## Objective
Create a single page application for displaying the location of all your photos and searching for photos within a certain region.

## Tools: 
⋅⋅* Postgres/PostGIS (for spatial database)
⋅⋅* Django REST Framework (for RESTful API)
⋅⋅* AWS S3 Storage (for image upload and storage)
⋅⋅* Google Maps API (for displaying map)
⋅⋅* React and Redux (for SPA and state management)

## Features
### Extracting EXIF Data From Uploaded Photos
Implements code to extract the exif data and convert it into usable latitude and longitude data that is converted into Point data. 

```
class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Photo.objects.all()

    def perform_create(self, serializer):
        data = self.request.data
        lat, lng = None, None
        if 'image' in data:
            exif_data = extract_geodata(data['image'])
            lat, lng = get_lat_lng(exif_data)
            lat = float("%.6f" % lat)
            lng = float("%.6f" % lng)
        user = self.request.user
        geo_location = Point(lng, lat)
        serializer.save(geo_location=geo_location, user=user)
```

### Query Postgres/PostGIS spatial database
Creates a polygon based on 5 Point fields representing the selected region on the map and makes a PostGIS query to find photos located within the polygon.

Created a custom PointField field to send the geo_location Point data to the frontend in a readable format. 

```
class PointField(Field):
    def __init__(self, precision=None, remove_duplicates=False, **kwargs):
        self.precision = precision
        self.remove_dupes = remove_duplicates
        super().__init__(**kwargs)
        self.style = {'base_template': 'textarea.html'}

    def to_representation(self, value):
        if isinstance(value, dict) or value is None:
            return value
        # we expect value to be a GEOSGeometry instance
        return value.coords
```

### JSON Web Token Authentication
Utilized django-rest-knox to create tokens upon user login that is sent back as part of the response. The token is stored in localStorage.


### Sample curl requests to test API Endpoints
curl -vk -X GET -H "Content-Type: application/json" "http://localhost:8000/gallery/api/gallery-view/"

curl -vk -X DELETE -H "Content-Type: application/json" "http://localhost:8000/gallery/api/photos/14/"