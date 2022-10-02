# gr62Project

## Installasjons guide

## Visual Studio Code (VS code)
Siden vi skal bruke VS code som utviklermiljø i teamet legger jeg bare ved en link til deres side.
- [Lenke til VScode](https://code.visualstudio.com/)

## Node.js
Node.js må du ha for å jobbe med prosjektet. Alle installeringer med `npm` krever node installert før bruk. 
1. installer anbefalt herfra: [Node.js](https://nodejs.org/en/)
2. Restart Pc-en
3. Da skal alt være good på Node fronten

## Firebase
Skriv i terminal i prosjektet `npm install firebase`

## React

**NB!** Dette er gjort allerede:
- For å lage en react app srkiver man `npx create-react-app my-app` hvor my-app er navnet på appen så den kan man endre.
- Før man kan kjøre må man bygge appen. Kjør derfor først `npm run build`. Dette må ikke gjøres hver gang man skal kjøre appen etterpå.

Hva du må gjøre:
- Når man skal kjøre appen for å se endringene man har gjort skriver man `npm start`. 

Hvordan stoppe kjørende React:
- Det er ikke bare å krysse ut localhost fanen. Man må trykke inn ctrl+c i terminalen for å stoppe React om man for eksempel vil restarte. 

Løse feilmeldinger:
- "'react-scripts' is not recognized as an internal or external command, operable program or batch file." 
    - Er en løsning å kjøre `npm install react-scripts --save` i terminal, deretter `npm start`. 

## Chakra UI
Skriv i terminal i prosjektet `npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^5`

Om man får feilen "Error: Can't resolve '@chakra-ui/icons'" så må man som oftest installere via terminalen med følgende kommando: `npm i @chakra-ui/icons`

#### Tips ved feil
- Når man importerer elementer fra chakra (eks. en box) kan man få error med beskjeden "@chakra-ui/core is missing". Dette er en legacy feil og man må endre til "@chakra-ui/react" i importen så skal ting fungere. 


## Gitbruksanvisning
For bruk av Git har vi en bruksanvisning under "Dokumentasjon" mappen. 
- [Lenke](https://gitlab.stud.idi.ntnu.no/tdt4140-2022/landsby-4/gruppe_62/gr62project/-/blob/main/Dokumentasjon/GitBruksanvisning.md)
