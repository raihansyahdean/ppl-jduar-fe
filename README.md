# JDUAR NVIDIA - Smart CRM Frontend
Smart CRM (Customer Relationship Management) is a progressive web app (PWA) which can ease customer in membership registration. Smart CRM implements face recognition and face identification to identify if a customer is already registered as member or not.

## Staging Pipeline Status
[![Pipeline](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2020/jduar-nvdia-smart-crm-frontend/badges/staging/pipeline.svg)](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2020/jduar-nvdia-smart-crm-frontend/commits/staging) [![coverage report](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2020/jduar-nvdia-smart-crm-frontend/badges/staging/coverage.svg)](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2020/jduar-nvdia-smart-crm-frontend/commits/staging)

## Projects URL
To Use Environment variable use : process.env.VUE_APP_VARNAMEHERE
Staging : https://ppl-smartcrm.herokuapp.com/
Production : https://smart-crm.herokuapp.com/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
* Install npm (Node Package Manager) [here](https://www.npmjs.com/get-npm) 
note : we're using 6.13.4 for node version, to check node version type :
```
npm -v
```

* Install git [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installing

A step by step series to get a development env running in your local PC

* Init git using :
(you must install git first in prerequisites)
```
git init
```

* Clone this repository using http :
```
git clone https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2020/jduar-nvdia-smart-crm-frontend.git
```

* or Clone this repository using ssh :
```
git clone git@gitlab.cs.ui.ac.id:ppl-fasilkom-ui/2020/jduar-nvdia-smart-crm-frontend.git
```

* Open our directory using :
```
cd jduar-nvdia-smart-crm-frontend
```

* Install all library depedencies using :
(you must install npm first in prerequisites)
```
npm install
```

## Running App

If you want to run this app, you must setting up and run our backend first. You can access out Backend repository [here](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2020/jduar-nvidia-smart-crm).

Run this app using :
```
npm run serve
```

Open your favourite web browser and open app's localhost (usually using 8080 as its port)


## Running Test
Run unittest using :
```
npm run test:unit
```

Run code style test (we're using eslint) using :

```
npm run lint
```

## Authors

* **Alya Zahra** (1706039906)
* **Gusti Ngurah Yama Adi Putra** (1706979253)
* **Julia Ningrum** (1706979322)
* **Rafif Taris** (1706979436)
* **Raihansyah Attallah Andrian** (1706040196)

Code with :heart: for PROYEK PERANGKAT LUNAK course of University of Indonesia Faculty of Computer Science.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
