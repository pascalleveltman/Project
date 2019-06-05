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

* Omvang

Omdat de wereldwijde data incompleet was, besloot ik mij op enkel Europa te focussen.

* Probleemstelling

'Misdaad in Europa' is niet echt een probleem wat je kan onderzoeken of oplossen. De probleemstelling van het onderzoek wordt daarom gewijzigd naar 'Voornaamste soort misdaad per land'. Hierbij kan de uitkomst helpen met beslissen naar welke politie projecten geld moet gaan om de meeste misdaad te bestrijden.

* Opbouw figuren

De eerste opbouw (wereldkaart --> double bar chart --> aster plot) moest vervangen. In de wereldkaart is namelijk maar 1 dimensie verwerkt en dat is niet genoeg om het onderwerp van dit project aan het licht te laten komen. Er is gekozen om de focus te leggen op de verhouding tussen Violent en Non-violent misdaad. De eerste figuur is dan ook een Sunburst (Land --> violent/non violent). De tweede figuur is gekozen voor een line chart die het verloop over tijd laat zien. De derde figuur is een bar chart die de getallen per subcategorie laat zien. Hiervoor wilde ik eerst een piechart gebruiken, maar deze leek te veel op een suburst. Daarnaast laat een bar chart goed onderscheid in categorien zien.

* Data

De data moet per misdaad subcategorie rate verzameld worden en samen worden gevoegd in 1 file voor ieder land. Ik weet nog niet zeker of dat goed gaat lukken en wat de verhoudingen tussen de rates zijn. Misschien valt het violent wel in het niet tegenover non violent of andersom. Dat gaan we woensdag zien...


### 4 juni
Vandaag was het eerste mentorgesprek en maak ik de laatste beslissingen over mijn design.

* Probleemstelling

Ik zette wat vraagtekens bij mijn probleemstelling: is het wel duidelijk genoeg? Ik probeerde meer mogelijkheden te vinden met mijn dataset. Misschien drugsgebruik linken aan misdaad, maar de data over drugsgebruik was (logisch genoeg) erg incompleet. Ik hield het er maar bij wat andere ideeen sloten niet aan bij een juiste 'probleemstelling'.

* Opbouw figuren

De opbouw Sunburst -> line chart -> bar chart blijft. De Sunburst krijgt een extra dimensie, namelijk noord/oost/zuid/west Europa met een kleur.

* Knoppen

Er wordt erop gewezen dat je ook knoppen moet toevoegen, dit was ik vergeten. Ik voeg bij de eerste suburst een slide toe voor het jaartal (2000 tot 2017). Daarnaast voeg ik bij de line chart een checkbox toe die violent, non violent, of allebei de lijnen laat zien.

* Overig

Het design en diagram werd in elkaar gezet dmv screenshots en pijlen.

### 4 juni
Vandaag was de eerste stand up. Daarnaast begin ik aan mijn prototype.

* Checkbox en links

Ik kreeg van mijn groepje feedback dat ik misschien in de donutchart (ingezoomde versie van sunburst) de vakken 'violent' en 'non violent' kon linken aan de line chart en de tijdslide weg kon laten. De tijd dimensie is alleen zichtbaar in de line chart De 3 nieuwe opties van de line chart worden dan: Violent(per categorie), Non Violent (per categorie) en beide totaal. Ik laat dit als optie omdat het veel werk kan zijn.
