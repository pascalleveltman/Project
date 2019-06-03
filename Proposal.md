# Project Proposal: Crime in Europe
# Pascalle Veltman, 11025646

## Problem Statement
Every country in Europe has different crime rates and categories. What kind of crimes are most committed in what countries? The answer to this question can be helpful in knowing where to spend extra money to successfully fight these crimes.

## Solution
In this project, the solution to this problem is an interactive map of Europe which clarifies the crime rates per country. The plan made for this is subscribed below and if there is time left, an extra dimension can be added.

  * Plan
    With an interactive map of Europe, the crime rate of a country can be inspected per category. The darker the country, the higher the (average) crime rate per year.

    [plaatje]

    When you click on a country, a bar chart appears. This chart shows the total crimes committed per year in that country (2000-2017).

    [plaatje]

    When you click on a bar (year) of the crime chart, underneath of that an aster plot appears which shows the different amounts per category of that year (homicide, assault, theft etc.).

    [plaatje]

  * Extra (if there is time)
    Besides the crime rates, the prisoner rates are added. When this is done, a second bar chart will be shown next to the crime one. If you click on a bar chart, an aster plot appears with the different categories: Adults, Juveniles, Nationals, Foreigners.


## Prerequisites
The prerequisites for starting the project consist of the data sources, external components, similar visualizations and a summery of the hardest parts.

### Data Sources
  * Description
    The data used in this project is obtained from the website of the United Nations of Drugs and Crime. The data files can be downloaded per crime category, which means that it has to be transformed into a single file before using it.

  * List
    [United Nations of Drugs and Crime](https://dataunodc.un.org/crime)

### External Components
  * d3
  * d3-tip

### Similar Visualizations
  * [Map with linked bar chart](https://vida.io/documents/4vZ9mRGyepoyQxFcK)
  * [Aster Plot](http://bl.ocks.org/bbest/2de0e25d4840c68f2db1)
  * [Bar chart with linked pie chart](http://bl.ocks.org/NPashaP/96447623ef4d342ee09b)

### Hardest parts
  * combining data in one file
  * deal with differences, outliers and missing data in dataset

## Sanity
