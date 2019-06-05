# Data

### Sources
The data source used for this project is just from one site (yet).

* [United Nations Office on Drugs and Crime](https://dataunodc.un.org/crime)

### Format
All data is yearly data of crime rates (crimes per 100.000 people) per country from 2000 to 2017. There are two main categories: violent and non violent crimes. These consist of many different subcategories.

Violent crimes:
* homicide
* serious assault
* kidnapping
* Sexual Violence
* Sexual Exploitation
* robbery

Non - violent crimes:
* Theft
* Burglary
* Theft of private cars
* Corruption
* Bribery
* Other acts of corruption
* Smuggling of migrants
* Trafficking in weapons and explosives
* Participation in an organized criminal group
* Financing of terrorism

Because the data is only available per subcategory, all these sets first have to be combined in one set with the total values. This can be done in excel.
Also, there is some data missing. The missing data is left blanc. For the first sunburst figure we take the average crime rate per year, so the blanc spots do not necessarily have a negative influence on that outcome.

## Technical components
* d3
* d3-tip

### Diagram with overview
* When you open the page:
![Preview](/doc/designp1.jpg)
* When you click on a country:
![Preview](/doc/designp2.jpg)
* When you select a year of a category:
![Preview](/doc/designp3.jpg)
