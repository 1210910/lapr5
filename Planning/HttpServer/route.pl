:- module(routes, [buildings_url/1,floors_url/1,rooms_url/1,passageways_url/1,lifts_url/1]).

api_domain_url('http://localhost:4000/api').

% buildings url
buildings_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/buildings/algav', URL).

% floors url
floors_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/floor/algav', URL).

% rooms url
rooms_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/room/algav', URL).

% passageways url
passageways_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/passageway/algav', URL).

%  lifts url
lifts_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/lift/algav', URL).

% map url
maps_url(URL):-
    api_domain_url(MAIN),
    atom_concat(MAIN,'/floorMap/algav',URL).


% task url
tasks_url(URL):-
    api_domain_url(MAIN),
    atom_concat(MAIN,'/taskRequest/accepted',URL).



