# Pascalle Veltman: 11025646
# converts CSV file to json

import csv, json
import pandas as pd
import matplotlib
matplotlib.use("TkAgg")
import matplotlib.pyplot as plt

# read csv file and save as dataframe
df = pd.read_csv(r'/Users/pascalleveltman/Documents/GiTHub/Project/data/Data_project.csv', header = 0)
json_file = '/Users/pascalleveltman/Documents/GiTHub/Project/data/Data_Project.json'

# create empty big file
data_dict = [{"2005" : [],
        "2006" : [],
        "2007" : [],
        "2008" : [],
        "2009" : [],
        "2010" : [],
        "2011" : [],
        "2012" : [],
        "2013" : [],
        "2014" : [],
        "2015" : [],
        "2016" : []}]

for index, row in df.iterrows():

    if row["GEO/TIME"] != "TOT":
        sort = row["SORT"]
        country = row["GEO/TIME"]

        if sort == "APR":
            for i in range(2, len(row)):
                year = str(df.columns[i])
                value = str(row[i])
                if value == "nan":
                    value == " "

                dict_country = {}
                dict_country["Country"] = str(country)
                dict_country[sort] = str(value)

                data_dict[0][year].append(dict_country)

        else:
            for i in range(2, len(row)):
                year = str(df.columns[i])
                value = str(row[i])
                if value == "nan":
                    value == " "

                for sub in data_dict[0][year]:
                    if sub["Country"] == str(country):
                        sub[sort] = value

print(json)

# write to json file
with open(json_file, "w") as json_data:
    json.dump(data_dict, json_data)
