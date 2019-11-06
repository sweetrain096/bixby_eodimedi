# -- coding: utf-8 --
import requests
import xml.etree.ElementTree as et
import xmltodict as xd
import os
import json

from flask import Flask, jsonify, make_response
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS



app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={
  r"*": {"origin": "*"},
})


class location(Resource):
    def get(self):
        parser = reqparse.RequestParser()

        parser.add_argument('key')
        parser.add_argument('lon')
        parser.add_argument('lat')
        parser.add_argument('page')
        parser.add_argument('row')

        key = parser.parse_args()['key']
        lon = parser.parse_args()['lon']
        lat = parser.parse_args()['lat']
        page = parser.parse_args()['page']
        row = parser.parse_args()['row']

        url = f'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire?ServiceKey={key}&WGS84_LON={lon}&WGS84_LAT={lat}&pageNo={page}&numOfRows={row}'
        res = requests.get(url).text
        parsed_data = xd.parse(res)

        return parsed_data

api.add_resource(location, '/location')


class detail(Resource):
    def get(self):
        parser = reqparse.RequestParser()

        parser.add_argument('key')
        parser.add_argument('HPID')

        key = parser.parse_args()['key']
        HPID = parser.parse_args()['HPID']

        url = f'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire?ServiceKey={key}&HPID={HPID}'
        res = requests.get(url).text
        parsed_data = xd.parse(res)

        return parsed_data

api.add_resource(detail, '/detail')


class plocation(Resource):
    def get(self):
        parser = reqparse.RequestParser()

        parser.add_argument('key')
        parser.add_argument('lon')
        parser.add_argument('lat')
        parser.add_argument('page')
        parser.add_argument('row')

        key = parser.parse_args()['key']
        lon = parser.parse_args()['lon']
        lat = parser.parse_args()['lat']
        page = parser.parse_args()['page']
        row = parser.parse_args()['row']

        url = f'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire?ServiceKey={key}&WGS84_LON={lon}&WGS84_LAT={lat}&pageNo={page}&numOfRows={row}'
        res = requests.get(url).text
        parsed_data = xd.parse(res)

        return parsed_data

api.add_resource(plocation, '/plocation')

class pdetail(Resource):
    def get(self):
        parser = reqparse.RequestParser()

        parser.add_argument('key')
        parser.add_argument('HPID')

        key = parser.parse_args()['key']
        HPID = parser.parse_args()['HPID']

        url = f'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyBassInfoInqire?ServiceKey={key}&HPID={HPID}'
        res = requests.get(url).text
        parsed_data = xd.parse(res)

        return parsed_data

api.add_resource(pdetail, '/pdetail')

if __name__ == '__main__':
    app.debug=True
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))