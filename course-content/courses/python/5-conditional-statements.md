---
path: "/python/5-conditional-statements"
title: "Voorwaardelijke statements"
hidden: false
---

<text-box variant='learningObjectives' name="Leerdoelen">

Na deze sectie

- Zul je een eenvoudige voorwaardelijke statement kunnen gebruiken in programmeren
- Zul je weten wat een Boolean waarde is
- Zul je voorwaardelijke statements kunnen uitdrukken met vergelijkingsoperatoren

</text-box>

Tot nu toe is elk programma dat we geschreven hebben regel voor regel in volgorde uitgevoerd. In plaats van elke regel code elke keer uit te voeren wanneer een programma gedraaid wordt, is het vaak nuttig om secties van het programma te maken die alleen in bepaalde situaties uitgevoerd worden.

Bijvoorbeeld, de volgende code controleert of de gebruiker meerderjarig is:

```python
age = int(input("Hoe oud ben je? "))

if age > 17:
    print("Je bent meerderjarig!")
    print("Hier is een kopie van GTA6 voor je.")

print("Volgende klant, alsjeblieft!")
```

Wanneer de gebruiker ouder is dan 17, zou de uitvoering van het programma er zo uit moeten zien:

<sample-output>

Hoe oud ben je? **18**
Je bent meerderjarig!
Hier is een kopie van GTA6 voor je.
Volgende klant, alsjeblieft!

</sample-output>

Als de gebruiker 17 of jonger is, wordt alleen dit geprint:

<sample-output>

Hoe oud ben je? **16**
Volgende klant, alsjeblieft!

</sample-output>

Deze voorbeelden laten ons zien dat de waarde die als input gegeven wordt beïnvloedt welke delen van het programma uitgevoerd worden. Het programma bevat een _voorwaardelijke statement_ met een blok code dat alleen uitgevoerd wordt als de voorwaarde in de statement waar is.

In een voorwaardelijke statement wordt het sleutelwoord `if` gevolgd door een _voorwaarde_, zoals een vergelijking van twee waarden. Het code blok dat volgt op deze header regel wordt alleen uitgevoerd als de voorwaarde waar is.

Let op het dubbele punt karakter dat volgt op de `if` header. In de volgende code is er geen dubbele punt:

```python
age = 10

# geen dubbele punt aan het einde van de volgende regel
if age > 17
    print("Je bent meerderjarig.")
```

Bij uitvoering veroorzaakt dit een fout:

<sample-output>
File "program.py", line 3
  if age > 17
            ^
SyntaxError: invalid syntax
</sample-output>

## Vergelijkingsoperatoren

Heel vaak bestaan voorwaarden uit het vergelijken van twee waarden. Hier is een tabel met de meest voorkomende vergelijkingsoperatoren die gebruikt worden in Python:

| Operator | Doel                      | Voorbeeld |
| :------: | ------------------------- | --------- |
|   `==`   | Gelijk aan                | `a == b`  |
|   `!=`   | Niet gelijk aan           | `a != b`  |
|   `>`    | Groter dan                | `a > b`   |
|   `>=`   | Groter dan of gelijk aan  | `a >= b`  |
|   `<`    | Kleiner dan               | `a < b`   |
|   `<=`   | Kleiner dan of gelijk aan | `a <= b`  |

Laten we kijken naar een programma dat verschillende dingen print afhankelijk van of het getal dat de gebruiker invoert negatief, positief, of gelijk aan nul is:

```python
number = int(input("Typ alsjeblieft een getal in: "))

if number < 0:
    print("Het getal is negatief.")

if number > 0:
    print("Het getal is positief.")

if number == 0:
    print("Het getal is nul.")
```

Voorbeelden van hoe het programma functioneert met drie verschillende inputs:

<sample-output>

Typ alsjeblieft een getal in: **15**
Het getal is positief.

</sample-output>

<sample-output>

Typ alsjeblieft een getal in: **-18**
Het getal is negatief.

</sample-output>

<sample-output>

Typ alsjeblieft een getal in: **0**
Het getal is nul.

</sample-output>

## Inspringing

Python herkent dat een blok code deel uitmaakt van een voorwaardelijke statement als elke regel code in het blok _ingesprongen_ is. Dat is, er zou een beetje witruimte moeten staan aan het begin van elke regel code binnen het code blok. Elke regel zou dezelfde hoeveelheid witruimte moeten hebben.

Bijvoorbeeld:

```python
password = input("Typ alsjeblieft een wachtwoord in: ")

if password == "kittycat":
    print("Je kende het wachtwoord!")
    print("Je moet ofwel de beoogde gebruiker zijn...")
    print("...ofwel een behoorlijk behendige hacker.")

print("Het programma heeft zijn uitvoering voltooid. Dank en dag!")
```

Je kunt de Tab-toets gebruiken, kort voor _tabulator_ toets, om een vastgestelde hoeveelheid witruimte in te voegen.

Wanneer je een ingesprongen code blok wilt beëindigen, kun je de `Backspace` toets gebruiken om terug te keren naar het begin van de regel.

<in-browser-programming-exercise name="Orwell" tmcname="part01-21_orwell">

Schrijf alsjeblieft een programma dat de gebruiker vraagt om een geheel getal. Het programma zou "Orwell" moeten printen als het getal precies 1984 is, en anders niets doen.

<sample-output>

Typ alsjeblieft een getal in: **2020**

</sample-output>

<sample-output>

Typ alsjeblieft een getal in: **1984**
Orwell

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Absolute waarde" tmcname="part01-22_absolute_value">

Schrijf alsjeblieft een programma dat de gebruiker vraagt om een geheel getal. Als het getal kleiner is dan nul, zou het programma het getal vermenigvuldigd met -1 moeten printen. Anders print het programma het getal zoals het is. Bekijk alsjeblieft de voorbeelden van verwacht gedrag hieronder.

<sample-output>

Typ alsjeblieft een getal in: **-7**
De absolute waarde van dit getal is 7

</sample-output>

<sample-output>

Typ alsjeblieft een getal in: **1**
De absolute waarde van dit getal is 1

</sample-output>

<sample-output>

Typ alsjeblieft een getal in: **-99**
De absolute waarde van dit getal is 99

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Soep of geen soep" tmcname="part01-23_soup_or_no_soup">

Schrijf alsjeblieft een programma dat vraagt om de naam van de gebruiker. Als de naam alles behalve "Jerry" is, vraagt het programma dan om het aantal porties en print de totale kosten uit. De prijs van een enkele порция is 5.90.

Twee voorbeelden van de uitvoering van het programma:

<sample-output>

Vertel me alsjeblieft je naam: **Kramer**
Hoeveel porties soep? **2**
De totale kosten zijn 11.8
Volgende alsjeblieft!

</sample-output>

<sample-output>

Vertel me alsjeblieft je naam: **Jerry**
Volgende alsjeblieft!

</sample-output>

</in-browser-programming-exercise>

## Boolean waarden en Boolean uitdrukkingen

Elke voorwaarde die gebruikt wordt in een voorwaardelijke statement zal resulteren in een waarheidswaarde, dat is, ofwel waar of onwaar. Bijvoorbeeld, de voorwaarde `a < 5` is waar als `a` kleiner is dan 5, en onwaar als `a` gelijk aan of groter is dan 5.

Deze soorten waarden worden vaak _Boolean_ waarden genoemd, genoemd naar de Engelse wiskundige George Boole. In Python worden ze afgehandeld door het `bool` data type. Variabelen van type `bool` kunnen slechts twee waarden hebben: `True` of `False`.

Elk stukje code dat resulteert in een Boolean waarde wordt een _Boolean uitdrukking_ genoemd. Bijvoorbeeld, de voorwaarde in een voorwaardelijke statement is altijd een Boolean uitdrukking, en de woorden _voorwaarde_ en _Boolean uitdrukking_ kunnen vaak door elkaar gebruikt worden.

Het resultaat van een Boolean uitdrukking kan opgeslagen worden in een variabele net zoals het resultaat van elke numerieke berekening:

```python
a = 3
condition = a < 5
print(condition)
if condition:
    print("a is kleiner dan 5")
```

<sample-output>

True
a is kleiner dan 5

</sample-output>

De Python sleutelwoorden `True` en `False` kunnen ook direct gebruikt worden. In het volgende voorbeeld wordt de `print` opdracht elke keer uitgevoerd, omdat de waarde van de voorwaarde `True` is:

```python
condition = True
if condition:
    print("Dit wordt elke keer geprint.")
```

<sample-output>

Dit wordt elke keer geprint.

</sample-output>

<in-browser-programming-exercise name="Rekenmachine" tmcname="part01-25_calculator">

Schrijf alsjeblieft een programma dat de gebruiker vraagt om twee getallen en een bewerking. Als de bewerking _add_, _multiply_ of _subtract_ is, zou het programma het resultaat van de bewerking met de gegeven getallen moeten berekenen en printen. Als de gebruiker iets anders typt, zou het programma niets moeten printen.

Sommige voorbeelden van verwacht gedrag:

<sample-output>

Getal 1: **10**
Getal 2: **17**
Bewerking: **add**

10 + 17 = 27

</sample-output>

<sample-output>

Getal 1: **4**
Getal 2: **6**
Bewerking: **multiply**

4 \* 6 = 24

</sample-output>

<sample-output>

Getal 1: **4**
Getal 2: **6**
Bewerking: **subtract**

4 - 6 = -2

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Temperaturen" tmcname="part01-26_temperatures">

Schrijf alsjeblieft een programma dat de gebruiker vraagt om een temperatuur in graden Fahrenheit, en print dan hetzelfde uit in graden Celsius. Als de omgezette temperatuur onder nul graden Celsius valt, zou het programma ook "Brr! Het is koud hier!" moeten printen.

De formule voor het omzetten van graden Fahrenheit naar graden Celsius kan gemakkelijk gevonden worden door elke zoekmachine van jouw keuze.

Twee voorbeelden van verwacht gedrag:

<sample-output>

Typ alsjeblieft een temperatuur in (F): **101**
101 graden Fahrenheit is gelijk aan 38.333333333333336 graden Celsius

</sample-output>

<sample-output>

Typ alsjeblieft een temperatuur in (F): **21**
21 graden Fahrenheit is gelijk aan -6.111111111111111 graden Celsius
Brr! Het is koud hier!

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Wat te dragen morgen" tmcname="part01-29_what_to_wear_tomorrow">

Schrijf alsjeblieft een programma dat vraagt naar de weersvoorspelling voor morgen en suggereert dan kleding die geschikt is voor het weer.

De suggestie zou moeten veranderen als de temperatuur (gemeten in graden Celsius) boven 20, 10 of 5 graden is, en ook als er regen op de radar is.

Sommige voorbeelden van verwacht gedrag:

<sample-output>

Wat is de weersvoorspelling voor morgen?
Temperatuur: **21**
Zal het regenen (ja/nee): **nee**
Draag een spijkerbroek en een T-shirt

</sample-output>

<sample-output>

Wat is de weersvoorspelling voor morgen?
Temperatuur: **11**
Zal het regenen (ja/nee): **nee**
Draag een spijkerbroek en een T-shirt
Ik raad ook een trui aan

</sample-output>

<sample-output>

Wat is de weersvoorspelling voor morgen?
Temperatuur: **7**
Zal het regenen (ja/nee): **nee**
Draag een spijkerbroek en een T-shirt
Ik raad ook een trui aan
Neem een jas mee

</sample-output>

<sample-output>

Wat is de weersvoorspelling voor morgen?
Temperatuur: **3**
Zal het regenen (ja/nee): **ja**
Draag een spijkerbroek en een T-shirt
Ik raad ook een trui aan
Neem een jas mee
Maak er eigenlijk een warme jas van
Ik denk dat handschoenen op hun plaats zijn
Vergeet je paraplu niet!

</sample-output>

</in-browser-programming-exercise>
