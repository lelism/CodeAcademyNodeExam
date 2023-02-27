# CodeAcademyNodeExam
Code Academy - NodeJS - exam

EXAM task:

NODE.JS egzaminas


Prasome uzsiregistruoti egzaminui nurodant savo varda, pavarde, ir githubo linka, kuriame galeciau matyti Jusu egzamina ir kai pabaigsite projekta pazymekite sekanti kvadrateli zaliai. 


Šio testo metu sukurti serverine programa, naudojant Node.JS programavimo aplinka. Uzduotis susideda is 4 lenteliu, kuri kiekviena turi tureti CRUD operacijas (GET, GET /{id}, DELETE, PATCH/PUT, POST)


Vertinimo kriterijai: 

Vertinant atsiželgiame į kodo stilių ir formatavimą, kodo skaidyma, aprasytu “routu” teisinguma, “modeliu” teisinguma ir pati veikima.

Papildomai, 1 balas už versijavimą su git ir darbo įkėlimą į GitHub. Rekomenduojama susikurti viena papildoma “branch” t.y. Dev ir padaryti pull request i “master”, tokiu budu bus galima matyti klaidas ir komentarus iskarto githube. Taip pat noriu, kad kasdien sukeltumete koda i githubo su zinute “Pabaiga: <valanda:minute> <data>”

1. Sukurti GitHub repozitoriją.

2. Pakeitimus daryti atskiroje šakoje (pvz. dev), kad būtų galima sukurti Pull Request.

3. Kuriant sistemą pakeitimus nuolatos saugoti su pakeitimus su prasmingomis "commit" žinutėmis.

4. Pabaigus projektą patikrinti ar visi pakeitimai yra nusiųsti į GitHub, sukurti Pull Request per GitHub puslapį į pagrindinę šaką (`main` arba `master`) ir pateikti nuorodą šiame "assignment".

5. Programos salygos

Duomenu baze: MySQL arba MongoDB

Jokiu papildomu duomenu baziu ar kitos programines irangos NENAUDOTI! Darbai nebus vertinami.

Duomenu tipus galie pasirinkti patys, ribojimu tame nera.

Sudetingesne uzklausa viena, tai orders

GET /api/v1/orders/{id} - 

{

	unitPrice: “”,

	quantity: “”,

	discount: “”,

customer: {

	…Employes table data

} 

	products: [

 	{

		id:””,

		lastName:””,

		…

}

]

}

Sėkmės
