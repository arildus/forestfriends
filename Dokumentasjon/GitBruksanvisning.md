# Git Bruksanvisning 

## installer Git
- Hvis du ikke har innstallert Git før kan det være lurt aller først
       -[Link til installasjon](https://git-scm.com/downloads)

## Cheat sheet
Det er nyttig å ha et jukse ark når man starter med Git, og her er en på norsk:
- [Cheat sheet](https://drive.google.com/file/d/1jJnAAixxJOcjr8kyltvxaiHez2r5hShO/view)

## Klone kodebasen til personlig pc
1. Gå inn på gr62Project hovedsiden kalt "gr62Project".
2. Klikk på Clone oppe til høyre i vinduet
3. Under "Åpne i din IDE" velger du "Visual studio code (https)"
4. Velg hvor du vil kodebasen (repository) skal ligge.
5. Nå skal du ha fått ordnet et klonet kodebase/repository på din pc :)

(Det er også mulig å bruke `git clone url` i terminal, men da er det viktig å ha gått inn i riktig mappe først via terminalen)

## Token (Kun nødvendig om kloning ikke går)
Siden GitLab har gått over til en toveis autentifisering kan det hende man får beskjed om å logge inn når man kloner ned kodebasen. Om dette oppstår så må man man gjøre følgene ting.
1. Klikk på bruker ikonet ditt øverst til høyre i vinduet.
2. Velge "prefrences" i menyen som popper opp.
3. Klikk så på "Access Tokens" i venstre menyen
4. Skriv så inn navn du ønsker at Tokene skal hete.
5. Klikk av for "api" i valgene under. Om noe senere blir feil kan du bruke en token med "read_repository" og "write_repository" også.
6. Klikk så på "Create personal access token" Nå har du laget et token du kan bruke for å få tilgang i VScode
7. Kopier token som er øverst i midten av vinduet (Viktig du trenger denne)
7. Følg stegene i kloning av kodebasen over.
8. Skriv inn NTNU brukernavnet ditt
9. Lim så inn tokene du kopierte i stad.
10. Du skal nå ha tilgang med alle retigheter til kodebasen :D

## Branching
Dette er det viktigste! Når man først har klonet får man opp master/main. Denne vil man aldri jobbe i for her skal det alltid være en fungerende app/kode.
Derfor lager man seg en branch i forholde til issuene vi har i prosjektet for å jobbe branchen uten å ødelegge masteren/main.
1. I terminalen din skriver du `git checkout -b nummerPåIssue-tittelenTilIssuet`. Man bruker bindestrek som mellomrom i branch navnet.
2. Nå er du i branchen du har laget og det er trygt å rote med koden din.
Eks. branchen denne teksten er laget i het: 2-Guide-for-repository. 

Skal man sjekke ut en annen branch så er det bare å skrive `git checkout branchnavn` til branchen du vil sjekke ut. 

### Fetching
Dette er en metode for å hente ned informasjon om brancher som er remote på GitLab.
Skriv `git fetch` i terminalen for å laste ned info om branchene så er man good og kan bruke `git checkout` for å gå inn i dem lokalt.

## Sende dine endringer til GitLab
Dette gjøres ikke til master men til remote for branchen du jobber i.

1. Skriv `git status` i terminalen for å se statusen på det du skal pushe til GitLab.
2. Skriv så `git add mappe/fil` du skal pushe opp.
3. Skriv så `git commit -m melding` hvor du skriver kort (under 50 ord) om hva du har gjort
4. Til slutt skriv `git push` så skal endringene dine ha blitt sendt til den remote branchen på GitLab for din lokale branch  

Viss du har laget branchen lokalt først må du lage en up stream og får en error på steg 4, men det er bare å kopiere det erroren sier du skal og trykke enter etter å ha limt det inn i terminalen så er du good og har laget en remote branch. :)

## Merging av branch til developerbranchen
Det går an å merge via git, men anbefaler heller å gjøre det i gitlab da det er mer oversiktlig + pluss da kan vi bruke GitLab sin innebygde funksjon for lukking av issuer ved merging av brancher som er nicee.

Men om du skal være en dare devil må du være i branchen du skal merge branchen du jobbet i med og skrive `git merge branchnavn`.  

## Terminal tips
Man kan bruke terminal for å lete seg frem til filer. Noe som er veldig praktisk når man jobber med prosjekter!
- Anbefaler viss man har windows å bruke git bash terminal som man kan skaffe her: [lenke](https://gitforwindows.org/). Dette fordi windows sin terminal ikke er den beste.
- Når man har oppe terminalen kan man skrive inn `ls` og trykke enter. Da får man opp en liste med veier i filsystemtreet man kan bevege seg.
- Vil man så lenger inn kan man skrive `cd navnPåFil/Mappe` og trykke enter. Da har man gått ett steg lenger inn i filsystemet.
- Vil man tilbake igjen kan man skrive `cd ..` også går man ett trinn tilbake igjen. Man kan alltids sjekke med en `ls` etter komandoen er skrevet. 
- For å åpne en mappe fra terminalen som ofte er raskere enn å klikke seg frem kan man skrive `explorer .` på windows og `open .` på mac. 
- Man kan også åpne en fil i VS code fra terminalen. Da skriver man `code .`. Dette skal funke på Windows, Linux og Mac.
