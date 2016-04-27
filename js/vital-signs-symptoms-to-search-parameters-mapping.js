var MAX = 99999;
var VITAL_SIGNS = [
    {
        "field": "Body mass index (BMI) [Ratio]",
        "keyword": "Underweight",
        "low_bounds": 0,
        "high_bounds": 18.5,
        "unit": "kg/m^2"
    },
    {
        "field": "Body mass index (BMI) [Ratio]",
        "keyword": "Normal Weight",
        "low_bounds": 18.5,
        "high_bounds": 25.0,
        "unit": "kg/m^2"
    },
    {
        "field": "Body mass index (BMI) [Ratio]",
        "keyword": "Overweight",
        "low_bounds": 25.0,
        "high_bounds": 30.0,
        "unit": "kg/m^2"
    },
    {
        "field": "Body mass index (BMI) [Ratio]",
        "keyword": "Class I Obesity",
        "low_bounds": 30.0,
        "high_bounds": 35.0,
        "unit": "kg/m^2"
    },
    {
        "field": "Body mass index (BMI) [Ratio]",
        "keyword": "Class II Obesity",
        "low_bounds": 35.0,
        "high_bounds": 40.0,
        "unit": "kg/m^2"
    },
    {
        "field": "Body mass index (BMI) [Ratio]",
        "keyword": "Class III Obesity",
        "low_bounds": 40,
        "high_bounds": MAX,
        "unit": "kg/m^2"
    },
    {
        "field": "Body mass index (BMI) [Ratio]",
        "keyword": "Obesity",
        "low_bounds": 30.0,
        "high_bounds": MAX,
        "unit": "kg/m^2"
    },
    {
        "field": "Glucose [Mass/volume] in Blood",
        "keyword": "Normal Blood Sugar",
        "low_bounds": 0,
        "high_bounds": 6.5,
        "unit": "mg/dl"
    },
    {
        "field": "Glucose [Mass/volume] in Blood",
        "keyword": "Prediabetes",
        "low_bounds": 5.7,
        "high_bounds": 6.4,
        "unit": "mg/dl"
    },
    {
        "field": "Glucose [Mass/volume] in Blood",
        "keyword": "Diabetes",
        "low_bounds": 6.5,
        "high_bounds": MAX,
        "unit": "mg/dl"
    },
    {
        "field": "Glucose [Mass/volume] in Blood",
        "keyword": "High Blood Sugar",
        "low_bounds": 5.7,
        "high_bounds": MAX,
        "unit": "mg/dl"
    }
];