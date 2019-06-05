# PixelSite
curl -vk -X GET -H "Content-Type: application/json" "http://localhost:8000/gallery/api/v1/photos/"

curl -vk -X DELETE -H "Content-Type: application/json" "http://localhost:8000/gallery/api/v1/upload/14/"

curl -vk -X GET -H "Content-Type: application/json" -H 'Authorization: Token <AUTH_TOKEN>' "https://eggtimer.herokuapp.com/api/v2/periods/" | python -m json.tool

You can filter based on minimum and maximum timestamp of the events:

curl -vk -X GET -H "Content-Type: application/json" -H 'Authorization: Token <AUTH_TOKEN>' "https://eggtimer.herokuapp.com/api/v2/periods/?min_timestamp=2016-01-19&max_timestamp=2016-01-20" | python -m json.tool

Create a period:

curl -vk -X POST -H "Content-Type: application/json" -H 'Authorization: Token <AUTH_TOKEN>' --data '{"timestamp": "THH:MM:SS"}' "https://eggtimer.herokuapp.com/api/v2/periods/"

heroku buildpacks:set -i 1 https://github.com/cyberdelia/heroku-geo-buildpack.git

heroku buildpacks:set -i 1 https://github.com/TrailStash/heroku-geo-buildpack.git

heroku buildpacks:set --index 1 https://github.com/heroku/heroku-buildpack-apt


heroku buildpacks:set --index 1 git://github.com/dulaccc/heroku-buildpack-geodjango.git#1.1
heroku buildpacks:set -i 2 heroku/nodejs
heroku buildpacks:set -i 3 heroku/python