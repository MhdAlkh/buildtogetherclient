## How to launch the project

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Architecture of the project

The front-end project is composed of 3 main modules : core / feature / shared

### Core module
Core part is used to give to the angular application all what she need. Core part can be compared
to the 'backend of the angular application'. There is 2 files, the helper and the service. 

Helper file contain files that will interact directly with the front-end app. For exemple, the file auth.interceptor.ts will 
modify the header of the HTML page.

Service file will contain all the services. This files will be useful for interact between the 
front-end app and the backend API. 

### Shared module

Shared part contain all the shared things of all the application. We have inside a components folder and 
a models folder.

The components folder with contains the angular components that will be use several time in the application. 
For exemple, the menu (header) is include in this file, because all the app pages will use this component.

The models folder contain all the model of the application. Models are the model of the data when a service call
the API

### Feature module

This module is the main part of the angular application. You can find in this module several 
sub-modules, like auth / home / page-not-found

Each feature need to have a distinct module. For exemple, the auth-module control the authentification
process, the home module control the application.

In the home module, you can find one file for all the pages, with sometimes sub-components. The dashboard, posts, public projects and user-profile
are the different main pages and the other components are used in different pages. 


## How to manage the routes

Every time you create a new module, you need to create the -routing.module.ts file and manage the routes of the current module here. Because
it is better to separate each routes in each modules for the maintainability of the code during the time


## How to contribute

If you want to add features, you can add a new branch of the project or clone the development branch. You can modify after what do
you wa nt in the project, you just need to follow the architecture of the main project.

