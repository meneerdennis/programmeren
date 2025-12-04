---
path: "/html-css/1-html-basics"
title: "HTML Basis"
hidden: false
---

<text-box variant='learningObjectives' name='Leerdoelen'>

Na deze sectie:

- Zul je begrijpen wat HTML is en waarom het gebruikt wordt
- Zul je de basisstructuur van een HTML document kennen
- Zul je eenvoudige HTML elementen kunnen maken
- Zul je het verschil begrijpen tussen block en inline elementen

</text-box>

HTML (HyperText Markup Language) is de standaard opmaaktaal voor het maken van webpagina's. Het beschrijft de structuur van een webpagina met behulp van opmaak tags.

Denk aan HTML als het skelet van een website - het biedt de basisstructuur waarop CSS (voor styling) en JavaScript (voor interactiviteit) kunnen bouwen.

## Basis HTML Document Structuur

Elk HTML document volgt een basisstructuur. Hier is een eenvoudig voorbeeld:

```html
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mijn Eerste Webpagina</title>
  </head>
  <body>
    <h1>Welkom op Mijn Website</h1>
    <p>Dit is mijn eerste alinea.</p>
  </body>
</html>
```

Laten we uit elkaar halen wat elk deel doet:

- `<!DOCTYPE html>` - Verklaart dit als een HTML5 document
- `<html>` - Het root element dat alle andere elementen bevat
- `<head>` - Bevat metadata over het document
- `<title>` - Specificeert de titel die getoond wordt in het browser tabblad
- `<body>` - Bevat alle zichtbare inhoud

## HTML Elementen

HTML elementen worden gedefinieerd door tags. De meeste elementen hebben een opening tag en een closing tag:

```html
<tagname>Inhoud gaat hier</tagname>
```

Sommige elementen zijn self-closing (ze hebben geen closing tags nodig):

```html
<img src="image.jpg" alt="Beschrijving" />
<br />
<hr />
```

## Veelvoorkomende HTML Elementen

### Koppen

HTML biedt zes niveaus van koppen, van `<h1>` (meest belangrijk) tot `<h6>` (minst belangrijk):

```html
<h1>Dit is een hoofdkop</h1>
<h2>Dit is een subkop</h2>
<h3>Dit is een kleinere subkop</h3>
```

### Alinea's

Gebruik `<p>` tags om alinea's van tekst te maken:

```html
<p>
  Dit is een alinea van tekst. Het kan meerdere zinnen bevatten en zal
  automatisch ombreken om te passen binnen de breedte van zijn container.
</p>
```

### Links

Maak hyperlinks met de `<a>` (anker) tag:

```html
<a href="https://www.example.com">Klik hier om Example.com te bezoeken</a>
```

### Afbeeldingen

Voeg afbeeldingen toe met de `<img>` tag:

```html
<img src="pad/naar/afbeelding.jpg" alt="Beschrijving van de afbeelding" />
```

### Lijsten

**Ongeordende lijsten** (opsommingstekens):

```html
<ul>
  <li>Eerste item</li>
  <li>Tweede item</li>
  <li>Derde item</li>
</ul>
```

**Geordende lijsten** (genummerd):

```html
<ol>
  <li>Eerste stap</li>
  <li>Tweede stap</li>
  <li>Derde stap</li>
</ol>
```

<in-browser-programming-exercise name="Maak je eerste kop" tmcname="html-01-first-heading">

Maak een HTML document met een `<h1>` element dat "Hallo, Wereld!" zegt.

```html
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mijn Eerste Pagina</title>
  </head>
  <body>
    <!-- Je h1 element zou hier moeten komen -->
  </body>
</html>
```

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Maak een eenvoudige webpagina" tmcname="html-02-simple-webpage">

Maak een eenvoudige webpagina met de volgende elementen:

- Een `<h1>` kop met de tekst "Mijn Favoriete Hobby's"
- Een `<p>` alinea die je favoriete hobby beschrijft
- Een ongeordende lijst met minimaal 3 hobby's

</in-browser-programming-exercise>

## Block vs Inline Elementen

### Block Elementen

Block elementen beginnen altijd op een nieuwe regel en nemen de volledige beschikbare breedte in beslag:

```html
<h1>Dit is een block element</h1>
<p>Dit is ook een block element</p>
<div>Dit is ook een block element</div>
```

### Inline Elementen

Inline elementen beginnen niet op een nieuwe regel en nemen alleen zo veel breedte in beslag als nodig is:

```html
<a href="#">Dit is een inline element</a>
<strong>Dit is ook inline</strong>
<em>Dit is ook inline</em>
```

<in-browser-programming-exercise name="Block vs Inline" tmcname="html-03-block-inline">

Maak een alinea die zowel block als inline elementen bevat. De alinea zou moeten bevatten:

- Een `<strong>` element om belangrijke tekst te benadrukken
- Een `<em>` element voor cursieve tekst
- Een `<a>` link element
- Een `<br>` regelafbreking

</in-browser-programming-exercise>

## Attributen

HTML elementen kunnen attributen hebben die extra informatie over het element geven:

```html
<img
  src="photo.jpg"
  alt="Een prachtige zonsondergang"
  width="300"
  height="200"
/>
<a href="mailto:iemand@example.com">Email me</a>
<p class="intro">Deze alinea heeft een class</p>
```

Veelvoorkomende attributen zijn:

- `src` - Bron van een afbeelding of andere resource
- `href` - URL voor links
- `alt` - Alternatieve tekst voor afbeeldingen
- `class` - CSS class naam
- `id` - Unieke identifier
- `style` - Inline CSS styling

<in-browser-programming-exercise name="Attributen toevoegen" tmcname="html-04-attributes">

Maak een link die:

- Wijst naar "https://www.w3schools.com"
- Opent in een nieuw tabblad (gebruik `target="_blank"`)
- De tekst "Leer HTML bij W3Schools" heeft

</in-browser-programming-exercise>
