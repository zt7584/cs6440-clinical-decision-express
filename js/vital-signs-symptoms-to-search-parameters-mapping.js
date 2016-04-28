var MAX = 99999;
var VITAL_SIGNS = [
    {
        "field": "39156-5",
        "keyword": "Underweight",
        "low_bounds": 0,
        "high_bounds": 18.5,
        "unit": "kg/m^2"
    },
    {
        "field": "39156-5",
        "keyword": "Normal Weight",
        "low_bounds": 18.5,
        "high_bounds": 25.0,
        "unit": "kg/m^2"
    },
    {
        "field": "39156-5",
        "keyword": "Overweight",
        "low_bounds": 25.0,
        "high_bounds": 30.0,
        "unit": "kg/m^2"
    },
    {
        "field": "39156-5",
        "keyword": "Class I Obesity",
        "low_bounds": 30.0,
        "high_bounds": 35.0,
        "unit": "kg/m^2"
    },
    {
        "field": "39156-5",
        "keyword": "Class II Obesity",
        "low_bounds": 35.0,
        "high_bounds": 40.0,
        "unit": "kg/m^2"
    },
    {
        "field": "39156-5",
        "keyword": "Class III Obesity",
        "low_bounds": 40,
        "high_bounds": MAX,
        "unit": "kg/m^2"
    },
    {
        "field": "39156-5",
        "keyword": "Obesity",
        "low_bounds": 30.0,
        "high_bounds": MAX,
        "unit": "kg/m^2"
    },
    {
        "field": "2339-0",
        "keyword": "Normal Blood Sugar",
        "low_bounds": 0,
        "high_bounds": 6.5,
        "unit": "mg/dl"
    },
    {
        "field": "2339-0",
        "keyword": "Prediabetes",
        "low_bounds": 5.7,
        "high_bounds": 6.4,
        "unit": "mg/dl"
    },
    {
        "field": "2339-0",
        "keyword": "Diabetes",
        "low_bounds": 6.5,
        "high_bounds": MAX,
        "unit": "mg/dl"
    },
    {
        "field": "2339-0",
        "keyword": "High Blood Sugar",
        "low_bounds": 5.7,
        "high_bounds": MAX,
        "unit": "mg/dl"
    },
    /*{
        "field": "Blood Pressure",
        "keyword": "Normal Blood Pressure",
        "systolic_low_bounds": 0,
        "systolic_high_bounds": 120,
        "diastolic_low_bounds": 0,
        "diastolic_high_bounds": 80,
        "unit": "mmHg"
    },
    {
        "field": "Blood Pressure",
        "keyword": "Prehypertension",
        "systolic_low_bounds": 120,
        "systolic_high_bounds": 139,
        "diastolic_low_bounds ": 80,
        "diastolic_high_bounds": 89,
        "unit": "mmHg"
    },
    {
        "field": "Blood Pressure",
        "keyword": "High Blood Pressure Stage 1",
        "systolic_low_bounds": 140,
        "systolic_high_bounds": 159,
        "diastolic_low_bounds ": 90,
        "diastolic_high_bounds": 99,
        "unit": "mmHg"
    },
    {
        "field": "Blood Pressure",
        "keyword": "Hypertension Stage 1",
        "systolic_low_bounds": 140,
        "systolic_high_bounds": 159,
        "diastolic_low_bounds ": 90,
        "diastolic_high_bounds": 99,
        "unit": "mmHg"
    },
    {
        "field": "Blood Pressure",
        "keyword": "High Blood Pressure Stage 2",
        "systolic_low_bounds": 160,
        "systolic_high_bounds": MAX,
        "diastolic_low_bounds": 100,
        "diastolic_high_bounds": MAX,
        "unit": "mmHg"
    },
    {
        "field": "Blood Pressure",
        "keyword": "Hypertension Stage 2",
        "systolic_low_bounds": 160,
        "diastolic_low_bounds ": 100,
        "unit": "mmHg"
    },
    {
        "field": "Blood Pressure",
        "keyword": "Hypertensive Crisis",
        "systolic_low_bounds": 180,
        "diastolic_low_bounds ": 110,
        "unit": "mmHg"
    },
    {
        "field": "Blood Pressure",
        "keyword": "High Blood Pressure",
        "systolic_low_bounds": 140,
        "diastolic_low_bounds ": 90,
        "unit": "mmHg"
    },*/
    {
        "field": "14647-2",
        "keyword": "Desirable Total Cholesterol",
        "low_bounds": 0,
        "high_bounds": 200,
        "unit": "mg/dl"
    },
    {
        "field": "14647-2",
        "keyword": "Normal Total Cholesterol",
        "low_bounds": 0,
        "high_bounds": 200,
        "unit": "mg/dl"
    },
    {
        "field": "14647-2",
        "keyword": "Borderline High Total Cholesterol",
        "low_bounds": 200,
        "high_bounds": 239,
        "unit": "mg/dl"
    },
    {
        "field": "14647-2",
        "keyword": "High Total Cholesterol",
        "low_bounds": 240,
        "high_bounds": MAX,
        "unit": "mg/dl"
    },
    {
        "field": "22748-8",
        "keyword": "Desirable LDL Cholesterol",
        "low_bounds": 0,
        "high_bounds": 130,
        "unit": "mg/dl"
    },
    {
        "field": "22748-8",
        "keyword": "Normal LDL Cholesterol",
        "low_bounds": 0,
        "high_bounds": 130,
        "unit": "mg/dl"
    },
    {
        "field": "22748-8",
        "keyword": "Borderline High LDL Cholesterol",
        "low_bounds": 130,
        "high_bounds": 159,
        "unit": "mg/dl"
    },
    {
        "field": "22748-8",
        "keyword": "High High LDL Cholesterol",
        "low_bounds": 160,
        "high_bounds": MAX,
        "unit": "mg/dl"
    },
    {
        "field": "14646-4",
        "keyword": "Desirable HDL Cholesterol",
        "low_bounds": 50,
        "high_bounds": MAX,
        "unit": "mg/dl"
    },
    {
        "field": "14646-4",
        "keyword": "Normal HDL Cholesterol",
        "low_bounds": 50,
        "high_bounds": MAX,
        "unit": "mg/dl"
    },
    {
        "field": "14646-4",
        "keyword": "Borderline Low HDL Cholesterol",
        "low_bounds": 40,
        "high_bounds": 49,
        "unit": "mg/dl"
    },
    {
        "field": "14646-4",
        "keyword": "Low HDL Cholesterol",
        "low_bounds": 0,
        "high_bounds": 40,
        "unit": "mg/dl"
    },
    {
        "field": "2571-8",
        "keyword": "Desirable Triglycerides",
        "low_bounds": 0,
        "high_bounds": 200,
        "unit": "mg/dl"
    },
    {
        "field": "2571-8",
        "keyword": "Borderline Triglycerides",
        "low_bounds": 200,
        "high_bounds": 399,
        "unit": "mg/dl"
    },
    {
        "field": "2571-8",
        "keyword": "High Triglycerides",
        "low_bounds": 400,
        "high_bounds": MAX,
        "unit": "mg/dl"
    },
    {
        "field": "2571-8",
        "keyword": "Normal Triglycerides",
        "low_bounds": 0,
        "high_bounds": 200,
        "unit": "mg/dl"
    },
    {
        "field": "8867-4",
        "keyword": "Poor Heart Rate",
        "low_bounds": 82,
        "high_bounds": MAX,
        "unit": "bpm"
    },
    {
        "field": "8867-4",
        "keyword": "Below Average Heart Rate",
        "low_bounds": 75,
        "high_bounds": 81,
        "unit": "bpm"
    },
    {
        "field": "8867-4",
        "keyword": "Average Heart Rate",
        "low_bounds": 70,
        "high_bounds": 74,
        "unit": "bpm"
    },
    {
        "field": "8867-4",
        "keyword": "Above Average Heart Rate",
        "low_bounds": 66,
        "high_bounds": 69,
        "unit": "bpm"
    },
    {
        "field": "8867-4",
        "keyword": "Good Heart Rate",
        "low_bounds": 62,
        "high_bounds": 65,
        "unit": "bpm"
    },
    {
        "field": "8867-4",
        "keyword": "Excellent Heart Rate",
        "low_bounds": 56,
        "high_bounds": 61,
        "unit": "bpm"
    },
    {
        "field": "8867-4",
        "keyword": "Athlete Heart Rate",
        "low_bounds": 49,
        "high_bounds": 55,
        "unit": "bpm"
    },
    {
        "field": "mood-rating",
        "keyword": "Anxious",
        "low_bounds": 0,
        "high_bounds": 3
    },
    {
        "field": "mood-rating",
        "keyword": "Depressed",
        "low_bounds": 0,
        "high_bounds": 3
    },
    {
        "field": "mood-rating",
        "keyword": "Angry",
        "low_bounds": 0,
        "high_bounds": 3
    },
    {
        "field": "mood-rating",
        "keyword": "Ashamed",
        "low_bounds": 0,
        "high_bounds": 3
    },
    {
        "field": "mood-rating",
        "keyword": "Worried",
        "low_bounds": 4,
        "high_bounds": 6
    },
    {
        "field": "mood-rating",
        "keyword": "Defensive",
        "low_bounds": 4,
        "high_bounds": 6
    },
    {
        "field": "mood-rating",
        "keyword": "Irritated",
        "low_bounds": 4,
        "high_bounds": 6
    },
    {
        "field": "mood-rating",
        "keyword": "Stressed",
        "low_bounds": 4,
        "high_bounds": 6
    },
    {
        "field": "mood-rating",
        "keyword": "Optimistic",
        "low_bounds": 7,
        "high_bounds": 10
    },
    {
        "field": "mood-rating",
        "keyword": "Resourceful",
        "low_bounds": 7,
        "high_bounds": 10
    },
    {
        "field": "mood-rating",
        "keyword": "Energetic",
        "low_bounds": 7,
        "high_bounds": 10
    },
    {
        "field": "mood-rating",
        "keyword": "Grateful",
        "low_bounds": 7,
        "high_bounds": 10
    },
    {
        "field": "8310-5",
        "keyword": "Fever",
        "low_bounds": 103,
        "high_bounds": MAX,
        "unit": "F"
    },
    {
        "field": "8310-5",
        "keyword": "Normal Temperature",
        "low_bounds": 100,
        "high_bounds": 103,
        "unit": "F"
    },
    {
        "field": "8310-5",
        "keyword": "Hypothermia",
        "low_bounds": 0,
        "high_bounds": 100,
        "unit": "F"
    }];