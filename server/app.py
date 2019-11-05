# -- coding: utf-8 --
import requests
import xml.etree.ElementTree as et
import xmltodict as xd
import json

from flask import Flask, jsonify, make_response
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS




# url = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire?ServiceKey=nw2RgjbfShJMzZ05sLGUzWEasNUweUuRNuA6YHyEvNHn9b3Ahc9rp8VMOKYbPW5qb%2FKqQ0eP1imWvPWKnjJ9Zw%3D%3D&WGS84_LON=127.302499&WGS84_LAT=36.346462&pageNo=1&numOfRows=3'

# res = requests.get(url).text
# parsed_data = xd.parse(res)
# json_type = json.dumps(parsed_data, ensure_ascii=False)


# print(json_type)


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








# class Data(Resource):
#     def get(self, text):
#         return make_response(res)

# api.add_resource(Data, '/location/<string:text>')



# class Db(Resource):
#     def post(self):
#         args = parser.parse_args().payload
#         args = json.loads(args)
#         text = args['actions'][0]['value']
#         with open('report.csv', 'a', encoding='utf-8') as f:
#             f.write(text+',\n')
#         return make_response('접수되었습니다.')

# parser.add_argument('siren')

# class Db2(Resource):
#     def post(self):
#         args = parser.parse_args().siren
#         args = args.replace("\'", "\"")
#         args = json.loads(args)
#         text = args['result']
#         with open('report.csv', 'a', encoding='utf-8') as f:
#             f.write(text+',\n')
#         return make_response('접수되었습니다.')


# api.add_resource(Db, '/db')
# api.add_resource(Db2, '/db2')

if __name__ == '__main__':
    app.debug=True
    app.run()