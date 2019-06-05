from knox.models import AuthToken
from rest_framework import viewsets, permissions
from .serializers import PhotoUploadSerializer, PhotoSerializer, FilteredPhotoSerializer
from .photo_metadata_extractor import extract_geodata, get_lat_lng
from django.contrib.gis.geos import Point, Polygon
from django.db.models import Q
from .models import Photo

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

class PhotoReadOnlySet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Photo.objects.filter(user_id=self.request.user)

    def list(self, request, *args, **kwargs):
        response = super(PhotoReadOnlySet, self).list(request, *args, **kwargs) # call the original 'list'
        user = self.request.user.id
        response.data = { user : { photo["id"] : photo for photo in response.data }} # customize the response data
        return response # return response with this custom representation

class FilteredPhotoReadOnlySet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FilteredPhotoSerializer
    permissions_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        upper_lat = float(self.request.query_params.get('upperLat'))
        lower_lat = float(self.request.query_params.get('lowerLat'))
        left_lng = float(self.request.query_params.get('leftLng'))
        right_lng = float(self.request.query_params.get('rightLng'))

        # if map boundaries are not in order (due to map repeating)
        if left_lng > right_lng:
            poly1 = Polygon(((left_lng, upper_lat), (169.98, upper_lat), (169.98, lower_lat), (left_lng, lower_lat), (left_lng, upper_lat)))
            poly2 = Polygon(((-169.98, upper_lat), (right_lng, upper_lat), (right_lng, lower_lat), (-169.98, lower_lat), (-169.98, upper_lat)))
            return Photo.objects.filter(Q(user_id=self.request.user) & Q(geo_location__within=poly1) | Q(geo_location__within=poly2) | Q(geo_location__intersects=Point(0,0)))
            
        poly = Polygon(((left_lng, upper_lat), (right_lng, upper_lat), (right_lng, lower_lat), (left_lng, lower_lat), (left_lng, upper_lat)))
        return Photo.objects.filter(Q(user_id=self.request.user) & Q(geo_location__within=poly) | Q(geo_location__intersects=Point(0,0)))