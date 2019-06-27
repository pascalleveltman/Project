# Final Report
Air Transport in Europe by Pascalle Veltman (11025646).

## Project Descirption
This website investigates the relationship between air (and train) transport and environmental performance of European countries. The bubble chart shows the Ecological Footprint and the Air Transport (international and inside Europe) per country in the year selected by the time slider. The scatterplot shows the correlation between the variables chosen in the checkbox of that same year. The variables are: Ecological Footprint, Flights, Train Rides and Environmental Expenditures by the Government. The line chart shows the development of the Footprint and Air transport over time of the country selected in the bubble chart or scatterplot.
![Preview](/Images/report.jpg)

## Technical Design
This Project consists of a website with two html pages. On the second page, the data is visualized. Every visualization has its own javscript file which is linked to the html page and the other javascript files. The d3 and d3-tip components are used.

### Home.html  
* **Function:** This is the first page the user sees on the website and. It contains information about the subject, the problem, the data and the variables.
* **Code:** The page contains a jumbotron, a navigation bar and two columns in the body. The style is defined in the head.
* **Related:** The navigation bar contains a link to the visualization page.

### Data.html  
* **Function:**  This page contains the visualization of the data of the subject. It invites the user to investigate the data over time of different variables. Each visualization is has a text box with explanation next to is.
* **Code:** The page contains a navigation bar, a jumbotron with title and time slider, a column for the bubble chart, a column for the line chart and a column for the scatter plot with text columns next to it. There is a column next to the bubble chart which contains legends and a check box. The style is defined in the head of the html page
* **Related:** The navigation bar contains a link to the home page.

### bubble.js
* **Function:** Visualization of the bubble chart of the selected year by the slider. Each bubble is a country in Europe, the size represents the average amount of international flights inside Europe per habitant. The color specifies what part of Europe the country is located. The darkness of the color represents the Ecological Footprint of the country.
* **Code:** This file contains the window.onload function in the beginning, which loads the data and calls all visualizations by its start settings (if needed): the year 2005, Belgium and air transport on both axis of the scatter. Also, it tells to call the scatter function when the user presses the submit button of the checkbox. Than it contains a bubble function which takes the data, a year and a dummy as variables. If the dummy is 0, the bubble chart svg is made for the firs time. If the dummy is 1, the bubble is only updated by transition. After this function, there are two functions to draw the legends.
* **Related:** The window on load function calls the slider, the scatter plot and the line chart. The bubble function is related to the line chart by an "on click" of the bubble. The time slider updates the bubble chart.

### slider.js
* **Function:** The user can choose which year between 2005 and 2016 is shown in the bubble chart in scatter plot.
* **Code:** This file contains just one function which takes all data as input variable. It selects the years in it and puts the slider in an svg.
* **Related:** When a year is selected in the slider, it updates the scatter plot and the bubble chart. It is called by the window onload function.

### scatterplot.js
* **Function:** This plot shows the user the (possible) correlation between different variables. The user can choose the variables of the x-axis and y-axis by the checkbox.
* **Code:** The file contains two functions. The first function takes all data as input variable and makes the scatter plot (svg) for the first time. The second function also takes all data as input variables and updates the scatter plot dots and the axes (by transition()) to the time slider and checkbox. The right data is selected by looking up the x_var and y_var inside the code.
* **Related:** The on load function calls the scatter for the first time with the variable "flight" for both axis. The checkbox and time slider updates the scatterplot. When the user clicks on a dot (which corresponds to a country), the line chart updates to the data of that country.

### linechart.js
* **Function:** The line chart shows the user the development of the footprint and air transport of a selected country over time.
* **Code:** The line chart file is build up the almost same way as the scatter plot file. It contains two functions. The first one takes the data as input and the country for plotting and makes the svg for the first time. It makes two lists of the data that will be plotted: the flights and the footprint per year and it makes separate left and right y-axis for these variables. The lines are made with d3.line. The second function updates the existing line and dots in the line chart by transition.
* **Related:** The on load function calls the line chart for the first time for Belgium. By clicking a bubble or a dot in the scatterplot, the line chart is updated.

## Challenges
During this project, the original plan has changed several times. I cannot really compare my project to the design file I made, because I have changed my subject and plan totally. However, there were still some other things which were a little more complicated than I expected.

### Data
As I mentioned above, the data of the old subject was not complete and correct enough to put together a good project. This resulted in changing the old subject to a new one after the first week. It is important to know what is possible with the dataset you have, before building a project around it. Luckily the second dataset was good enough to work with.

### Data format
Than there was the challenge to get the data in the right json format. The format which suits your project really depends on the figures yout want to show. This was difficult to understand right away and it has cost me a day to do it right. However, as soon as I got this right it was easy to implement the figures I wanted to show.

### Figures
Originally, the plan for the project was to make a main map of Europe about air transport. Unfortunately this was not informative enough for the subject. It was quite difficult to choose good figures that show the information you want to give the user and answer the main question. The bubble chart seemed to be a good solution for my subject.

### Buttons
Two buttons had to be added in the project. At first, this was a challenge because it the buttons have to give an extra dimension to the visualizations. But later it turned to be a really practical tool. Instead of showing the average data per country of the year 2005-2016, the year can now be changed and selected by a slider. Besides that, adding a checkbox to both axis of the scatterplot made it way more interesting and possible to add other variables and see the correlation, than just one axis.

### Transitions
The biggest challenge was the transition. This was mainly because the javascript files and its functions had to be reorganized. There has to be an extra function for the update, but not to many unnecessary overlapping with the existing variables. I did not realize this change before making the files in the beginning with the 'remove' button, but it has turned out very good in the end.

## Overview
The final version of this project really is a better version than the first one. The idea to put 20 data sets together without knowing how complete they were and what the proportion between the values would be, turned out to be very messy. The new data set I had put together was way better to work with. Also, the bubble chart and other charts really suited the data structure and were interesting tools to work with.
