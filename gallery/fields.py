from rest_framework.fields import Field
from django.contrib.gis.geos import Point

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

    # def to_internal_value(self, value):
    #     if value == '' or value is None:
    #         return value
    #     if isinstance(value, Point):
    #         # value already has the correct representation
    #         return value
    #     # if isinstance(value, dict):
    #     #     value = json.dumps(value)
    #     # try:
    #     geo_location = Point(lng, lat)
    #     return geo_location
    #     # except (GEOSException):
    #     #     raise ValidationError(_('Invalid format: string or unicode input unrecognized as GeoJSON, WKT EWKT or HEXEWKB.'))
    #     # except (ValueError, TypeError, GDALException) as e:
    #     #     raise ValidationError(_('Unable to convert to python object: {}'.format(str(e))))
