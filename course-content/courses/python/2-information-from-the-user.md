---
path: "/python/2-information-from-the-user"
title: "Informatie van de gebruiker"
hidden: false
---

<text-box variant='learningObjectives' name='Leerdoelen'>

Na deze sectie

- Zul je weten hoe je een programma schrijft dat input van de gebruiker gebruikt
- Zul je weten hoe je variabelen gebruikt om input op te slaan en te printen
- Kun je strings combineren

</text-box>

_Input_ verwijst naar alle informatie die een gebruiker aan het programma geeft. Specifiek leest de Python opdracht `input` een regel input in die door de gebruiker getypt is. Het kan ook gebruikt worden om een bericht aan de gebruiker te tonen, om specifieke input te vragen.

Het volgende programma leest de naam van de gebruiker in met de `input` opdracht. Het print het dan uit met de `print` opdracht:

```python
name = input("Wat is je naam? ")
print("Hallo, " + name)
```

De uitvoering van dit programma zou er zo uit kunnen zien (input van de gebruiker in rood):

<sample-output>

Wat is je naam? **Paul Python**
Hallo, Paul Python

</sample-output>

Wat dit programma print is gedeeltelijk afhankelijk van input van de gebruiker. Dat betekent dat de uitvoering van het programma er ook zo uit zou kunnen zien:

<sample-output>

Wat is je naam? **Paula Programmer**
Hallo, Paula Programmer

</sample-output>

Het woord `name` in dit programma is een _variabele_. In de context van programmeren is een variabele een locatie voor het opslaan van een bepaalde _waarde_, zoals een string of een getal. Deze waarde kan later gebruikt worden, en kan ook veranderd worden.

<text-box variant="hint" name="Variabelen een naam geven">

In principe kunnen variabelen vrijelijk benoemd worden, binnen bepaalde grenzen die in de Python taal gespecificeerd zijn.

Het is een veelgebruikte internationale programmeerpraktijk om variabelen in het Engels te benoemen, maar je kunt code tegenkomen waar variabelen in andere talen benoemd zijn, zoals de moedertaal van de programmeur. De naam van de variabele heeft geen direct effect op de inhoud ervan, dus de naam doet er in die zin niet toe. Echter, het kan vaak helpen bij het begrijpen hoe code functioneert als variabelen logisch en in het Engels benoemd zijn.

</text-box>

<in-browser-programming-exercise name="Naam twee keer" tmcname="part01-06_name_twice">

Schrijf alsjeblieft een programma dat vraagt om de naam van de gebruiker en deze dan twee keer print, op twee opeenvolgende regels.

Een voorbeeld van hoe het programma zou moeten functioneren:

<sample-output>

Wat is je naam? **Paul**
Paul
Paul

</sample-output>

</in-browser-programming-exercise>

## Verwijzen naar een variabele

Een enkele variabele kan veel keren in een programma worden aangeroepen:

```python
name = input("Wat is je naam? ")

print("Hallo, " + name + "!")
print(name + " is een mooie naam.")
```

Als de gebruiker de naam `Paul Python` geeft, print dit programma het volgende:

<sample-output>

Wat is je naam? **Paul Python**
Hallo, Paul Python!
Paul Python is een mooie naam.

</sample-output>

Laten we eens kijken naar de manier waarop de `print` opdracht hierboven wordt gebruikt. Binnen de haken van de opdracht staat zowel tekst in aanhalingstekens als variabelenamen die verwijzen naar input van de gebruiker. Deze zijn gecombineerd met een `+` operator, die _concateneert_ twee strings tot een enkele string.

Strings en variabelen kunnen vrijelijk gecombineerd worden:

```python
name = input("Wat is je naam? ")

print("Hallo " + name + "! Laat me controleren: je naam is " + name + "?")
```

Als de gebruiker de naam `Ellen Example` geeft, print dit

<sample-output>

Wat is je naam? **Ellen Example**
Hallo Ellen Example! Laat me controleren: je naam is Ellen Example?

</sample-output>

</in-browser-programming-exercise name="Naam en uitroeptekens" tmcname="part01-07_name_and_exclamation_marks">

Schrijf alsjeblieft een programma dat vraagt om de naam van de gebruiker en deze dan twee keer print op een enkele regel zodat er een uitroepteken aan het begin van de regel staat, nog een tussen de twee namen en een derde aan het einde van de regel.

Het programma zou als volgt moeten functioneren:

<sample-output>

Wat is je naam? **Paul**
!Paul!Paul!

</sample-output>

</in-browser-programming-exercise>

## Meer dan één input

Een programma kan vragen om meer dan één input. Let erop hoe hieronder elke `input` opdracht de ontvangen waarde opslaat in een andere variabele.

```python
name = input("Wat is je naam? ")
email = input("Wat is je e-mailadres? ")
nickname = input("Wat is je bijnaam? ")

print("Laten we controleren of we dit goed hebben")
print("Je naam: " + name)
print("Je e-mailadres: " + email)
print("Je bijnaam: " + nickname)
```

Het programma zou dit kunnen printen, bijvoorbeeld:

<sample-output>

Wat is je naam? **Frances Fictitious**
Wat is je e-mailadres? **frances99@example.com**
Wat is je bijnaam? **Fran**
Laten we controleren of we dit goed hebben
Je naam: Frances Fictitious
Je e-mailadres: frances99@example.com
Je bijnaam: Fran

</sample-output>

Als dezelfde variabele gebruikt wordt om meer dan één input op te slaan, zal elke nieuwe waarde de vorige vervangen. Bijvoorbeeld:

```python
address = input("Wat is je adres? ")
print("Dus je woont op adres " + address)

address = input("Typ alsjeblieft een nieuw adres in: ")
print("Je adres is nu " + address)
```

Een voorbeeld van de uitvoering van het programma:

<sample-output>

Wat is je adres? **Python Straat 101, Flat 3D**
Dus je woont op adres Python Straat 101, Flat 3D
Typ alsjeblieft een nieuw adres in: **Nieuwe Straat 999**
Je adres is nu Nieuwe Straat 999

</sample-output>

Dit betekent dat als dezelfde variabele gebruikt wordt om twee inputs achter elkaar op te slaan, er geen manier is om de eerste input waarde te benaderen nadat deze vervangen is door de tweede:

```python
address = input("Wat is je adres? ")
address = input("Typ alsjeblieft een nieuw adres in: ")

print("Je adres is nu " + address)
```

Een voorbeeld van hoe de output van het programma eruit zou kunnen zien:

<sample-output>

Wat is je adres? **Python Straat 10**
Typ alsjeblieft een nieuw adres in: **Programmer's Wandeling 23**
Je adres is nu Programmer's Wandeling 23

</sample-output>

</in-browser-programming-exercise name="Naam en adres" tmcname="part01-08_name_and_address">

Schrijf alsjeblieft een programma dat vraagt om de naam en het adres van de gebruiker. Het programma zou ook de gegeven informatie moeten printen, als volgt:

<sample-output>

Voornaam: **Steve**
Achternaam: **Sanders**
Straatadres: **91 Station Road**
Stad en postcode: **London EC05 6AW**
Steve Sanders
91 Station Road
London EC05 6AW

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Fix de code: Uitingen" tmcname="part01-09_utterances">

Hier is een programma dat zou moeten vragen om drie uitingen en deze printen, als volgt:

<sample-output>

Het 1ste deel: **hickory**
Het 2de deel: **dickory**
Het 3de deel: **dock**
hickory-dickory-dock!

</sample-output>

Echter, er is iets mis met de onderstaande code. Repareer het alsjeblieft.

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Verhaal" tmcname="part01-10_story">

Schrijf alsjeblieft een programma dat het volgende verhaal print. De gebruiker geeft een naam en een jaar, die ingevoegd zouden moeten worden in de printout.

<sample-output>

Typ alsjeblieft een naam in: **Mary**
Typ alsjeblieft een jaar in: **1572**

Mary is een dappere ridder, geboren in het jaar 1572. Op een ochtend werd Mary wakker door een afschuwelijk lawaai: een draak naderde het dorp. Alleen Mary kon de bewoners van het dorp redden.

</sample-output>

Het verhaal zou moeten veranderen volgens de input die door de gebruiker gegeven is.

</in-browser-programming-exercise>
