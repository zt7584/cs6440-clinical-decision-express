var BASE_URL = "http://polaris.i3l.gatech.edu:8080/gt-fhir-webapp/base/";
var JSON_FORMAT = "_format=json";
var ELASTIC_SEARCH_CLOUD_BASE = "http://383841da62cb454fa7ad4d51c9685e7c.us-west-1.aws.found.io:9200/";
var USERNAME = "admin";
var PASSWORD = "admin";

// Value Holders
var ID_HOLDER = "<ID>";
var INDEX_HOLDER = "<INDEX>";
var TYPE_HOLDER = "<TYPE>";

// Patient Related
var GET_PATIENT_BY_ID = BASE_URL + "Patient?_id=" + ID_HOLDER + "&" + JSON_FORMAT;

// Elastic Search Cloud
var PUT_JSON_SINGLE = ELASTIC_SEARCH_CLOUD_BASE + INDEX_HOLDER + "/" + TYPE_HOLDER + "/" + ID_HOLDER;
