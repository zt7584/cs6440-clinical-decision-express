//var BASE_URL = "http://polaris.i3l.gatech.edu:8080/gt-fhir-webapp/base/";
var BASE_URL = "http://52.72.172.54:8080/fhir/baseDstu2/"
var JSON_FORMAT = "_format=json";
var ELASTIC_SEARCH_CLOUD_BASE = "http://383841da62cb454fa7ad4d51c9685e7c.us-west-1.aws.found.io:9200/";
var USERNAME = "admin";
var PASSWORD = "admin";

// Value Holders
var ID_HOLDER = "<ID>";
var INDEX_HOLDER = "<INDEX>";
var TYPE_HOLDER = "<TYPE>";

// DataStore Prefix
var CDE_DATA_STORE_PREFIX = "cde_";

// Patient Related
var GET_PATIENT_BY_ID = BASE_URL + "Patient?_id=" + ID_HOLDER + "&" + JSON_FORMAT;
var FETCH_ALL_PATIENTS = BASE_URL + "Patient";

// Elastic Search Cloud
var PUT_JSON_SINGLE = ELASTIC_SEARCH_CLOUD_BASE + INDEX_HOLDER + "/" + TYPE_HOLDER + "/" + ID_HOLDER;
var SEARCH_RESOURCE = ELASTIC_SEARCH_CLOUD_BASE + INDEX_HOLDER + "/" + TYPE_HOLDER + "/_search";

// Diagnostic Reports Related
var FETCH_DIAGNOSTIC_REPORTS = BASE_URL + "DiagnosticReport?diagnosis=2.16.840.1.113883.6.96|190330002";
var FETCH_ALL_DIAGNOSTIC_REPORTS = BASE_URL + "DiagnosticReport";
var FETCH_DIAGNOSTIC_REPORT_BY_ID = BASE_URL + "DiagnosticReport?_id=" + ID_HOLDER;

// Observation Related
var FETCH_ALL_OBSERVATIONS = BASE_URL + "Observation";
var FETCH_OBSERVATION_BY_ID = BASE_URL + "Observation?_id=" + ID_HOLDER;

// Encounter Related
var GET_ENCOUNTER_BY_ID = BASE_URL + "Encounter?_id=" + ID_HOLDER;
var GET_PRACTITIONER_BY_ID = BASE_URL + "Practitioner?_id=" + ID_HOLDER;

// Condition Related
var GET_CONDITION_BY_ID = BASE_URL + "Condition?_id=" + ID_HOLDER;

var getPatientName = function (patient) {
    if (patient.name !== undefined && patient.name.length > 0) {
        return patient.name[0].given.join(" ") + " " + patient.name[0].family.join(" ");
    }
    return "";
}

var getPatientAddress = function (patient) {
    if (patient.address !== undefined && patient.address.length > 0) {
        return patient.address[0].line + ", " + patient.address[0].city + ", "
            + patient.address[0].state + " " + patient.address[0].postalCode;
    }
    return "";
}
