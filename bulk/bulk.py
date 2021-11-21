from elasticsearch import Elasticsearch, helpers
from elasticsearch_dsl import Index
import json, re
import codecs
import unicodedata
# import queries

client = Elasticsearch(HOST="http://localhost", PORT=9200)
INDEX = 'actors'

# Creating index if not manually created
# def createIndex():
#     index = Index(INDEX, using=client)
#     res = index.create()
#     print(res)

def read_all_actors():
    with open('actors.json', 'r', encoding='utf-8-sig') as f:
        all_actors = json.loads(f.read().replace("}\n{", "},\n{"))
        res_list = [i for n, i in enumerate(all_actors) if i not in all_actors[n + 1:]]
        return res_list

def generateData(actors_array):
    for actor in actors_array:
 
        name = actor.get("නම", None)
        personal_life = actor.get("පෞද්ගලික ජීවිතය",None)
        career = actor.get("වෘත්තිය ජීවිතය", None)
        birthday = actor.get("උපන් දිනය", None)
        birth_place = actor.get("උපන් ස්ථානය", None)
        education = actor.get("අධ්‍යාපනය", None)
        nationality = actor.get("ජාතිය", None)
        religion = actor.get("ආගම", None)

        yield {
            "_index": "actors",
            "_source": {
                "නම": name,
                "පෞද්ගලික ජීවිතය": personal_life,
                "වෘත්තිය ජීවිතය": career,
                "උපන් දිනය": birthday,
                "උපන් ස්ථානය": birth_place,
                "අධ්‍යාපනය": education,
                "ජාතිය": nationality,
                "ආගම": religion
            },
        }

# createIndex()
all_actors = read_all_actors()
helpers.bulk(client,generateData(all_actors))