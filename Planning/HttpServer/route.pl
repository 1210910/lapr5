:- module(routes, [buildings_url/1,floors_url/1,rooms_url/1,passageways_url/1,lifts_url/1]).

api_domain_url('http://localhost:4000/api').

% buildings url
buildings_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/buildings', URL).

% floors url
floors_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/floor', URL).

% rooms url
rooms_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/room', URL).

% passageways url
passageways_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/passageway', URL).

%  lifts url
lifts_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/lift', URL).

% map url
maps_url(URL):-
    api_domain_url(MAIN),
    atom_concat(MAIN,'/floorMap',URL).



