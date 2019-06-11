# Process Book

## Voor Week 1
Via United Nations Office on Drugs and Crime kwam ik op een duidelijke dataset over misdaad en drugs. Hierin staat veel wereldwijde data over het aantal misdaden (en verschillende soorten daarvan), vervolgingen en gevangenen per jaar per land in count en in rate (niet per se duidelijk wat deze rate inhoud). Al snel was ik er over uit dat ik wereldwijde misdaad rate interessant vond en dat dit een fijne dataset is die ik wil gebruiken. Ik kies voor het tijdsinterval 2000-2017.

## Week 1
Deadlines:
* Maandag: Proposal
* Dinsdag: Design
* Vrijdag: Prototype

### 3 juni
Met feedback op mijn korte proposal maakte ik een aantal nieuwe beslissingen en aanpassingen voor mijn uiteindelijke proposal.

#### Omvang
Omdat de wereldwijde data incompleet was, besloot ik mij op enkel Europa te focussen.

#### Probleemstelling
'Misdaad in Europa' is niet echt een probleem wat je kan onderzoeken of oplossen. De probleemstelling van het onderzoek wordt daarom gewijzigd naar 'Voornaamste soort misdaad per land'. Hierbij kan de uitkomst helpen met beslissen naar welke politie projecten geld moet gaan om de meeste misdaad te bestrijden.

#### Opbouw figuren
De eerste opbouw (wereldkaart --> double bar chart --> aster plot) moest vervangen worden. In de wereldkaart is namelijk maar 1 dimensie verwerkt en dat is niet genoeg om het onderwerp van dit project aan het licht te laten komen. Er is gekozen om de focus te leggen op de verhouding tussen Violent en Non-violent misdaad. De eerste figuur is dan ook een Sunburst (Land --> violent/non violent). De tweede figuur is gekozen voor een line chart die het verloop over tijd laat zien. De derde figuur is een bar chart die de getallen per subcategorie laat zien. Hiervoor wilde ik eerst een piechart gebruiken, maar deze leek te veel op een suburst. Daarnaast laat een bar chart goed onderscheid in categorien zien.

#### Data
De data moet per misdaad subcategorie rate verzameld worden en samen worden gevoegd in 1 file voor ieder land. Ik weet nog niet zeker of dat goed gaat lukken en wat de verhoudingen tussen de rates zijn. Misschien valt het violent wel in het niet tegenover non violent of andersom. Dat gaan we woensdag zien...


### 4 juni
Vandaag was het eerste mentorgesprek en maak ik de laatste beslissingen over mijn design.

#### Probleemstelling
Ik zette wat vraagtekens bij mijn probleemstelling: is het wel duidelijk genoeg? Ik probeerde meer mogelijkheden te vinden met mijn dataset. Misschien drugsgebruik linken aan misdaad, maar de data over drugsgebruik was (logisch genoeg) erg incompleet. Ik hield het er maar bij wat andere ideeen sloten niet aan bij een juiste 'probleemstelling'.

#### Opbouw figuren
De opbouw Sunburst -> line chart -> bar chart blijft. De Sunburst krijgt een extra dimensie, namelijk noord/oost/zuid/west Europa met een kleur.

#### Knoppen
Er wordt erop gewezen dat je ook knoppen moet toevoegen, dit was ik vergeten. Ik voeg bij de eerste suburst een slide toe voor het jaartal (2000 tot 2017). Daarnaast voeg ik bij de line chart een checkbox toe die violent, non violent, of allebei de lijnen laat zien.

Het design en diagram werd in elkaar gezet dmv screenshots en pijlen.

### 5 juni
Vandaag was de eerste stand up. Daarnaast begin ik aan mijn prototype.

#### Checkbox en links
Ik kreeg van mijn groepje feedback dat ik misschien in de donutchart (ingezoomde versie van sunburst) de vakken 'violent' en 'non violent' kon linken aan de line chart en de tijdslide weg kon laten. De tijd dimensie is alleen zichtbaar in de line chart De 3 nieuwe opties van de line chart worden dan: Violent(per categorie), Non Violent (per categorie) en beide totaal. Ik laat dit als optie omdat het veel werk kan zijn.

#### Pagina
Het basis ontwerp voor de homepage werd gemaakt om te kijken wat de meest praktische manier is om het in te delen.

#### Data
Ik heb van Europa de een categorie violent (homicide rate) en non violent (theft rate) in 1 tabel gezet. Het was erg lastig omdat de landen en jaren niet compleet overeen kwamen van de verschillende data sets dus het kostte veel tijd. Dit om uit te proberen of het uberhaubt mogelijk is, en het daarna uit te breiden met meer categorien van violent en non violent. Het begin van de sunburst werd gemaakt maar gaf nog geen goed beeld, ik zou er morgen aan verder werken.


### 6 juni
Verder werken aan de data en proberen deze vandaag op orde te krijgen.

#### Data
De gehele dag ben ik bezig geweest om alle data per categorie in de juiste format van jaren en landen te krijgen. Echter, op de helft bleek de data van de United ations Office on Drugs and Crime niet te kloppen. de data versprong verdacht raar, het leek of ze af en toe een 0 vergeten waren. Uit frustratie  probeerde ik andere data te zoeken over dit onderwerp maar helaas was er niet veel te vinden.


### 7 juni
Er leek niets anders op te zitten dan een nieuw onderwerp te bedenken. Dit keer zal ik eerst een complete dataset proberen te vinden, en daar een onderzoeksvraag bij vormen. Daarna wil ik doormiddel van andere datasets dit vraagstuk proberen te beantwoorden.

#### Onderwerp
Het onderwerp wordt het vliegverkeer binnen Europa per land per jaar (2005-2017, deze data is het meest compleet). De bron van alle datasets is ![ec Europe](https://ec.europa.eu/eurostat/statistics-explained/index.php/Air_transport_statistics). Het onderwerp trekt me aan en interesseert me, omdat ik altijd benieuwd ben hoe mensen op klimaatverandering reageren of hun eigen gedrag er naar aanpassen. De focus ligt op binnen Europa omdat het alternatief een trein kan zijn. De probleemstelling is dan ook: welke landen maken gemiddeld de meeste vluchten binnen Europa per inwoner?

#### Data
De datasets worden verzameld en al in een excel bestand gezet om te kijken of ze kloppen en compleet zijn. Als eerste is dit het aantal vluchten per inwoner. Andere datasets die bij dit onderwerp betrokken zijn, zijn het aantal internationale treinritten per inwoner en de uitgaven van de overheid aan verbetering van milieu. De correlatie tussen deze onderwerpen kan erg interessant zijn. Om het aantal treinritten en vluchten per inwoner te berekenen, worden de data van het aantal passagiers van internationale vluchten en treinritten binnen Europa per land gedeeld door de populatie van dat land. Door deze zelfgevormde dataset krijg ik een beter idee bij de rate per land.

## Week 2
Vormgeving van het nieuwe onderwerp.

### 10 juni
Vandaag thuis verder gewerkt aan het nieuwe onderwerp: European Air Transport.

#### Visualisaties
Er zijn 2 ideeen voor visualtisaties.

* De eerste is een wereldkaart. De kleur per land geeft het gemiddeld aantal luchten per inwoner aan. Het jaar kan je kiezen met een slider (2005-2017). Wanneer je op een land klikt, verschijnt er een line chart en een scatter plot. de line chart vormt op de x-as de jaren en de y-as het aantal vluchten. Bij de scatter staat op de y-as het aantal vluchten en de x-as kan je selecteren met een checkbox (overheidsuitgaven, treinritten etc.)

* De tweede is een bubble chart. Ieder land is een bubbel, de grootte geeft het aantal vluchten aan en de kleur de overheidsuitgaven per land. Wanneer je op een land klikt, verschijnt er een line chart en een scatter plot. de line chart vormt op de x-as de jaren en de y-as het aantal vluchten. Bij de scatter staat op de y-as het aantal vluchten en de x-as kan je selecteren met een checkbox (overheidsuitgaven, treinritten etc.)

#### Data
Er moeten een aantal landen komen te vervallen omdat deze te incompleet zijn, bijvoorbeeld Croatie. Verder is de dataset van 2005 tot 2017 redelijk compleet en oogt bruikbaar.

### 11 juni
