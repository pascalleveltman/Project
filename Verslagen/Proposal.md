# Project Proposal: Crime in Europe
# Pascalle Veltman, 11025646

## Problem Statement
Every country in Europe has different crime rates and categories. Are there more violent than not violent crimes in a certain country? And what kind of crimes are most committed? The answer to this question can be helpful in knowing where to spend extra money to successfully fight these crimes.

## Solution
In this project, the answer to the questions in this problem can be shown by interactive images. The plan made for this is subscribed below and if there is time left, an extra dimension can be added.

### Plan

![Preview](/doc/plan.jpg)

* Primarily, a zoomable sunburst graph is shown. This sunburn shows crime rate of the year selected by a slide from 2000 until 2017 of North, West, East or South Europe in the first ring. The second selects the precise country. The third ring specifies which part of that average crime rate is violent, and which is not violent. Because there are many different countries, the choice is made to only use three rings (and exclude the subcategories of violent and not violent crimes) in order to keep a clear view.

* When you click on a country, next to the sunburst a line chart shows the total crime rate of that country per year from 2000 to 2017, separated in two lines (violent and not violent). You can choose which line is shown by a checkbox.

* When you click on a year point of one of the lines in that chart, underneath of that a bar chart appears which shows the different amounts of crimes per sub category of that year. For violent crimes these are for example homicide, assault, kidnapping. For not violent crimes examples of the subcategories are theft, corruption, smuggling etc.

### Extra (if there is time)
Besides the crime rates, the prisoner rates are added. When this is done, a switch button is made which changes the sunburst.


## Prerequisites
The prerequisites for starting the project consist of the data sources, external components, similar visualizations and a summery of the hardest parts.

### Data Sources
The data used in this project is obtained from the website of the United Nations of Drugs and Crime. The data files can be downloaded per crime category, which means that it has to be transformed into a single file before using it.

*  [United Nations of Drugs and Crime](https://dataunodc.un.org/crime)

### External Components
* d3
* d3-tip

### Similar Visualizations
* [Zoomable Sunburst](https://bl.ocks.org/kerryrodden/477c1bfb081b783f80ad)
* [Multiple line chart](http://bl.ocks.org/d3noob/e99a762017060ce81c76)
* [Bar chart with](http://bl.ocks.org/d3noob/8952219)

### Hardest parts
* combining data in one file
* deal with differences, outliers and missing data in dataset
