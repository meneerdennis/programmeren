---
path: "/python/4-arithmetic-operations"
title: "Rekenkundige bewerkingen"
hidden: false
---

<text-box variant='learningObjectives' name="Leerdoelen">

Na deze sectie

- Zul je variabelen in verschillende rekenkundige bewerkingen kunnen gebruiken
- Zul je weten hoe je om te gaan met getallen in gebruikersinput
- Zul je weten hoe je waarden cast naar andere fundamentele data types

</text-box>

In de vorige secties heb je voorbeelden gezien met basis rekenkunde. In de volgende tabel kun je de meest voorkomende rekenkundige operatoren in Python zien, met voorbeelden:

| Operator | Doel                              | Voorbeeld  | Resultaat |
| :------: | --------------------------------- | ---------- | --------- |
|   `+`    | Optelling                         | `2 + 4`    | `6`       |
|   `-`    | Aftrekking                        | `10 - 2.5` | `7.5`     |
|   `*`    | Vermenigvuldiging                 | `-2 * 123` | `-246`    |
|   `/`    | Deling (zwevende-komma resultaat) | `9 / 2`    | `4.5`     |
|   `//`   | Deling (integer resultaat)        | `9 // 2`   | `4`       |
|   `%`    | Modulo                            | `9 % 2`    | `1`       |
|   `**`   | Exponentiële                      | `2 ** 3`   | `8`       |

De volgorde van bewerkingen is bekend uit de wiskunde: bereken eerst de exponenten, dan vermenigvuldiging en deling, en tenslotte optelling en aftrekking. De volgorde kan veranderd worden met haakjes.

Bijvoorbeeld dit stukje code

```python
print(2 + 3 * 3)
print((2 + 3) * 3)
```

print uit

<sample-output>

11
15

</sample-output>

## Operanden, operatoren en data types

Een berekening bestaat meestal uit _operanden_ en _operatoren_:

Het data type van een operand bepaalt meestal het data type van het resultaat: als twee integers bij elkaar opgeteld worden, zal het resultaat ook een integer zijn. Als een zwevende-komma getal afgetrokken wordt van een ander zwevende-komma getal, is het resultaat een zwevende-komma getal. In feite, als een enkele van de operanden in een uitdrukking een zwevende-komma getal is, zal het resultaat ook een zwevende-komma getal zijn, ongeacht de andere operanden.

Deling `/` is een uitzondering op deze regel. Het resultaat is een zwevende-komma getal, zelfs als de operanden integers zijn. Bijvoorbeeld `1 / 5` zal resulteren in het zwevende-komma getal `0.2`.

Voorbeeld:

```python
height = 172.5
weight = 68.55

# de Body Mass Index, of BMI, wordt berekend door het lichaamsgewicht te delen door het kwadraat van de lengte
# de lengte wordt omgezet naar meters in de formule
bmi = weight / (height / 100) ** 2

print(f"De BMI is {bmi}")
```

Dit programma print het volgende:

<sample-output>

De BMI is 23.037177063642087

</sample-output>

Let op dat Python ook een integer deling operator heeft `//`. Als de operanden integers zijn, zal het een integer produceren. Het resultaat wordt naar beneden afgerond naar het dichtstbijzijnde integer. Bijvoorbeeld dit programma

```python
x = 3
y = 2

print(f"/ operator {x/y}")
print(f"// operator {x//y}")
```

print uit

<sample-output>

/ operator 1.5
// operator 1

</sample-output>

## Getallen als input

We hebben al de `input` opdracht gebruikt om strings van de gebruiker in te lezen. Dezelfde functie kan gebruikt worden om getallen in te lezen, maar de string die geproduceerd wordt door de functie moet dan omgezet worden naar een numeriek data type in de programmacode. In de vorige sectie casten we integers als strings met de `str` functie. Hetzelfde basis principe geldt hier, maar de naam van de casting functie zal anders zijn.

Een string kan omgezet worden naar een integer met de functie `int`. Het volgende programma vraagt de gebruiker naar hun geboortejaar en slaat het op in de variabele `input_str`. Het programma maakt dan een andere variabele `year`, die het jaar bevat omgezet naar een integer. Na dit is de berekening `2021-year` mogelijk, met de door de gebruiker verstrekte waarde.

```python
input_str = input("In welk jaar ben je geboren? ")
year = int(input_str)
print(f"Je leeftijd aan het einde van het jaar 2021: {2021 - year}" )
```

<sample-output>

In welk jaar ben je geboren? **1995**
Je leeftijd aan het einde van het jaar 2021: 26

</sample-output>

Meestal hoef je geen twee aparte variabelen te maken (zoals `input_str` en `year` hierboven) om een getalwaarde van de gebruiker te lezen. In plaats daarvan kan het lezen van de input met de `input` functie en het omzetten met de `int` functie in één keer bereikt worden:

```python
year = int(input("In welk jaar ben je geboren? "))
print(f"Je leeftijd aan het einde van het jaar 2021: {2021 - year}" )
```

Evenzo kan een string omgezet worden naar een zwevende-komma getal met de functie `float`. Dit programma vraagt de gebruiker naar hun lengte en gewicht, en gebruikt deze om hun BMI te berekenen:

```python
height = float(input("Wat is je lengte? "))
weight = float(input("Wat is je gewicht? "))

height = height / 100
bmi = weight / height ** 2

print(f"De BMI is {bmi}")
```

Een voorbeeld printout van het programma:

<sample-output>

Wat is je lengte? **163**
Wat is je gewicht? **74.45**
De BMI is 28.02137829801649

</sample-output>

<in-browser-programming-exercise name="Vijf keer" tmcname="part01-13_times_five">

Schrijf alsjeblieft een programma dat de gebruiker vraagt om een getal. Het programma print dan het getal vermenigvuldigd met vijf uit.

Het programma zou als volgt moeten functioneren:

<sample-output>

Typ alsjeblieft een getal in: **3**
3 keer 5 is 15

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Naam en leeftijd" tmcname="part01-14_name_and_age">

Schrijf alsjeblieft een programma dat de gebruiker vraagt om hun naam en geboortejaar. Het programma print dan een bericht als volgt uit:

<sample-output>

Wat is je naam? **Frances Fictitious**
In welk jaar ben je geboren? **1990**
Hallo Frances Fictitious, je zult 31 jaar oud zijn aan het einde van het jaar 2021

</sample-output>

</in-browser-programming-exercise>

## Variabelen gebruiken

Laten we kijken naar een programma dat de som van drie getallen berekent die door de gebruiker gegeven zijn:

```python
number1 = int(input("Eerste getal: "))
number2 = int(input("Tweede getal: "))
number3 = int(input("Derde getal: "))

sum = number1 + number2 + number3
print(f"De som van de getallen: {sum}")
```

Een voorbeeld uitvoering van het programma:

<sample-output>

Eerste getal: **5**
Tweede getal: **21**
Derde getal: **7**
De som van de getallen: 33

</sample-output>

Het programma gebruikt vier verschillende variabelen, maar twee zouden gemakkelijk genoeg zijn in dit geval:

```python
sum = 0

number = int(input("Eerste getal: "))
sum = sum + number

number = int(input("Tweede getal: "))
sum = sum + number

number = int(input("Derde getal: "))
sum = sum + number

print(f"De som van de getallen: {sum}")
```

Nu worden alle inputs van de gebruiker ingelezen in dezelfde variabele `number`. De waarde van de variabele `sum` wordt _verhoogd_ met de waarde van de variabele `number` elke keer dat de gebruiker een nieuw getal invoert.

Laten we eens kijken naar deze opdracht:

```python
sum = sum + number
```

Hier worden de waarde van de variabele `sum` en de waarde van de variabele `number` bij elkaar opgeteld, en het resultaat wordt terug opgeslagen in de variabele `sum`. Bijvoorbeeld, als voor de opdracht de waarde van `sum` 3 is en de waarde van `number` 2, na de uitvoering van de opdracht is de waarde van `sum` 5.

Het verhogen van de waarde van een variabele is een zeer veel voorkomende bewerking. Als zodanig is er een veelgebruikte afkorting notatie die hetzelfde resultaat bereikt als de expliciete optelling hierboven:

```python
sum += number
```

Dit stelt ons in staat om het bovenstaande programma iets beknopter te schrijven:

```python
sum = 0

number = int(input("Eerste getal: "))
sum += number

number = int(input("Tweede getal: "))
sum += number

number = int(input("Derde getal: "))
sum += number

print(f"De som van de getallen: {sum}")
```

In feite hebben we de variabele `number` niet per se nodig. De inputs van de gebruiker kunnen ook zo verwerkt worden:

```python
sum = 0

sum += int(input("Eerste getal: "))
sum += int(input("Tweede getal: "))
sum += int(input("Derde getal: "))

print(f"De som van de getallen: {sum}")
```

Natuurlijk hangt het af van de context hoeveel variabelen nodig zijn. Als het vereist is om elke waarde te onthouden die de gebruiker invoert, zal het niet mogelijk zijn om dezelfde variabele te "hergebruiken" om verschillende waarden van de gebruiker te lezen. Overweeg het volgende:

```python
number1 = int(input("Eerste getal: "))
number2 = int(input("Tweede getal: "))

print(f"{number1} + {number2} = {number1+number2}")
```

<sample-output>

Eerste getal: **2**
Tweede getal: **3**
2 + 3 = 5

</sample-output>

Aan de andere kant heeft het bovenstaande programma geen benoemde variabele voor het opslaan van de som van de twee waarden.

Een variabele "hergebruiken" heeft alleen zin als er behoefte is aan tijdelijk opslaan van dingen van een vergelijkbaar type en doel, bijvoorbeeld bij het optellen van getallen.

<in-browser-programming-exercise name="Seconden in een dag" tmcname="part01-15_seconds_in_a_day">

Schrijf alsjeblieft een programma dat de gebruiker vraagt om een aantal dagen. Het programma print dan het aantal seconden in het gegeven aantal dagen uit.

Het programma zou als volgt moeten functioneren:

<sample-output>

Hoeveel dagen? **1**
Seconden in zoveel dagen: 86400

</sample-output>

Ander voorbeeld:

<sample-output>

Hoeveel dagen? **7**
Seconden in zoveel dagen: 604800

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Fix de code: Product" tmcname="part01-16_product">

Dit programma vraagt de gebruiker om drie getallen. Het programma print dan hun product uit, dat is, de getallen vermenigvuldigd met elkaar. Er is echter iets mis met het programma - het werkt niet helemaal goed, zoals je kunt zien als je het uitvoert. Repareer het alsjeblieft.

Een voorbeeld van de verwachte uitvoering van het programma:

<sample-output>

Typ alsjeblieft het eerste getal in: **2**
Typ alsjeblieft het tweede getal in: **3**
Typ alsjeblieft het derde getal in: **5**
Het product is 30

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Som en product" tmcname="part01-17_sum_and_product">

Schrijf alsjeblieft een programma dat de gebruiker vraagt om twee getallen. Het programma zal dan de som en het product van de twee getallen printen.

Het programma zou als volgt moeten functioneren:

<sample-output>

Getal 1: **3**
Getal 2: **7**
De som van de getallen: 10
Het product van de getallen: 21

</sample-output>

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Voedseluitgaven" tmcname="part01-19_food_expenditure">

Schrijf alsjeblieft een programma dat de typische voedseluitgaven van een gebruiker schat.

Het programma vraagt de gebruiker hoeveel keer per week ze eten in de studentenkantine. Dan vraagt het naar de prijs van een typische studentenlunch, en naar geld uitgegeven aan boodschappen tijdens de week.

Gebaseerd op deze informatie berekent het programma de typische voedseluitgaven van de gebruiker zowel wekelijks als dagelijks.

Het programma zou als volgt moeten functioneren:

<sample-output>

Hoeveel keer per week eet je in de studentenkantine? **4**
De prijs van een typische studentenlunch? **2.5**
Hoeveel geld geef je uit aan boodschappen in een week? **28.5**

Gemiddelde voedseluitgaven:
Dagelijks: 5.5 euro
Wekelijks: 38.5 euro

</sample-output>

</in-browser-programming-exercise>
