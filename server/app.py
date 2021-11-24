import flask
from flask_cors import CORS, cross_origin
import json
from elasticsearch import Elasticsearch
from mtranslate import translate
import re
import process_sinhala
from rules import classify, isEducation
from flask import request


index_name = 'actors'
es = Elasticsearch('localhost', port=9200)
tokenizer = None
stemmer = None

def phrase_queries_basic(query):  #phrase query that matches exact query given
    res = es.search(
    index=index_name,
        body={
                "query": {
                    "query_string": {
                    "query": query,
                    "default_operator": "AND"
                    }
                },
                    "aggs": {
                        "relegion_filter": {
                            "terms": {
                                "field": "ආගම.keyword",
                                "size": 5
                            }
                        },
                        "nation_filter": {
                            "terms": {
                                "field": "ජාතිය.keyword",
                                "size": 5
                            }
                        },
                        "birth_filter": {
                            "terms": {
                                "field": "උපන් ස්ථානය.keyword",
                                "size": 5
                            }
                        }
                    }
                }
    )
    res["single"] = False
    return res

    #get results by collage/university
def education_query_basic(query):

    res = es.search(
                index=index_name,
                size=5,
                body={
                    "query": {
                        "match_phrase_prefix": {
                            "අධ්‍යාපනය": query[:-2]
                        }
                    },
                    "aggs": {
                        "relegion_filter": {
                            "terms": {
                                "field": "ආගම.keyword",
                                "size": 5
                            }
                        },
                        "nation_filter": {
                            "terms": {
                                "field": "ජාතිය.keyword",
                                "size": 5
                            }
                        },
                        "birth_filter": {
                            "terms": {
                                "field": "උපන් ස්ථානය.keyword",
                                "size": 5
                            }
                        }
                    }
                }
    )
    res["single"] = False
    return res
 


def query_es_basic_nat_rel_ed( rules,new_search_query ):
    field=''
    if(rules[-3]):
        field="ජාතිය"
    elif(rules[-2]):
        field="ආගම"
    else:
        field="අධ්‍යාපනය"
    res = es.search(
            index=index_name,
            size=1,
            body={
                "query": {
                    "match_phrase_prefix": {
                        "නම": new_search_query.replace("ගේ",'')
                    }
                }
            }
        )
    # print(new_search_query)
    if(res["hits"]["total"]["value"] > 0):
        res["single"] = True
        res["single_result"] = (res["hits"]["hits"][0]["_source"][field])
    else:
        res["single"] = False
    # print(res)
    return res


def query_es_basic(search_term, limit):

    res = es.search(
        index=index_name,
        size=limit,
        body={
            'query': {
                'multi_match': {
                    'query': search_term,
                    'fields': [
                        "නම^4",
                        "ආගම^2",
                        "උපන් ස්ථානය^2",
                        "ජාතිය^2",
                        "වෘත්තිය",
                        "උපන් දිනය",
                        "පෞද්ගලික ජීවිතය"
                    ]
                }
            },
            "aggs": {
                "relegion_filter": {
                    "terms": {
                        "field": "ආගම.keyword",
                        "size": 5
                    }
                },
                "nation_filter": {
                    "terms": {
                        "field": "ජාතිය.keyword",
                        "size": 5
                    }
                },
                "birth_filter": {
                    "terms": {
                        "field": "උපන් ස්ථානය.keyword",
                        "size": 5
                    }
                }
            }
        }
    )
    res["single"] = False
    return res


def query_es_basic_boosted(limit, classify_out, query, new_search_query):

    # print("New Q", new_search_query)
    search_term = query
    should_list = []

    if classify_out[0]:
        should_list.append({'match': {'උපන් ස්ථානය': new_search_query[:5]}})
        should_list.append({'match': {'උපන් දිනය': search_term}})
    elif classify_out[1]:
        should_list.append({'match': {'උපන් දිනය': search_term}})
    elif classify_out[2]:
        should_list.append({'match': {'උපන් දිනය': search_term}})
    elif search_term != '':
        should_list.append({'match': {'නම"': search_term}})
        should_list.append({'match': {'පෞද්ගලික ජීවිතය': search_term}})
        should_list.append({'match': {'වෘත්තිය ජීවිතය': search_term}})
        should_list.append({'match': {'ජාතිය': search_term}})

    res = es.search(
        index=index_name,
        size=limit,
        body={
            'query': {
                'bool': {
                    'should': should_list
                }
            },
            "aggs": {
                "relegion_filter": {
                    "terms": {
                        "field": "ආගම.keyword",
                        "size": 5
                    }
                },
                "nation_filter": {
                    "terms": {
                        "field": "ජාතිය.keyword",
                        "size": 5
                    }
                },
                "birth_filter": {
                    "terms": {
                        "field": "උපන් ස්ථානය.keyword",
                        "size": 5
                    }
                }
            }
        }
    )
    res["single"] = False
    return res


def basicSearch(query):

    query = query.replace('.', ' ')
    limit = 50

    # phrase query check
    if(query[0]=='"' and query[-1]=='"'):
        return phrase_queries_basic(query)


    isEd,edquery=isEducation(query)
 

    if(isEd):
        print("true")
        return education_query_basic(edquery)

    # get token list
    token_list, query = process_sinhala.token_stem(query, tokenizer, stemmer)
    rules = classify(token_list)



    if (rules == False):           # not classified
        print('[DEBUG] Not rating query => query_es_basic')
        return query_es_basic(query, limit)
    elif(rules[-1] or rules[-2] or rules[-3]):
        # print(rules)
        return query_es_basic_nat_rel_ed(rules, rules[3])
    else:
        new_search_query = rules[3]
        print('[DEBUG] Rating query => query_es_basic_boosted')
        return query_es_basic_boosted(limit, rules, query, new_search_query)


def advanced_search(data):

    limit = 5
    must_list = []
    should_list = []

    name = data["name"]
    country = data["country"]
    bday = data["bday"]
    relegion = data["relegion"]
    education = data["school"]
    nationality = data["nationality"]
    

    # print(name, bday, country, relegion)

    if(name != ""):
        must_list.append({'match_phrase': {'නම': name}})
    if (country != ""):
        must_list.append({'match_phrase': {'උපන් ස්ථානය': country[:5]}})
    if(bday != ""):
        must_list.append({'match_phrase': {'උපන් දිනය': bday}})
    if(relegion != ""):
        must_list.append({'match_phrase': {'ආගම': relegion}})
    if(education != ""):
        must_list.append({'match_phrase': {'අධ්‍යාපනය': education}})
    if(nationality != ""):
        must_list.append({'match_phrase': {'ජාතිය': nationality}})

    res = es.search(
        index=index_name,
        size=limit,
        body={
            'query': {
                'bool': {
                    'must': must_list,
                }
            },
        }
    )
    res["single"] = False
    return res


# initialize flask app
app = flask.Flask(__name__)
app.config['SECRET_KEY'] = 'actors app'
app.config['CORS_HEADERS'] = 'Content-Type'

# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
cors = CORS(app)


@app.route('/basicsearch', methods=['POST'])
def basic():
    # print("in basic search")
    content = request.json
    q = content["q"]
    # print(q)
    return basicSearch(q)


@app.route('/advancedsearch', methods=['POST'])
def advanced():
    print("In advanced Search ")
    content = request.json
    return advanced_search(content)


if __name__ == '__main__':
    tokenizer, stemmer = process_sinhala.get_sn_process_setup()

    app.run(host='127.0.0.1', port='5002',debug=True)
