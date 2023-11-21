:- module(routes, [buildings_url/1]).

api_domain_url('http://localhost:4000/api').

% buildings url
buildings_url(URL) :-
    api_domain_url(MAIN),
    atom_concat(MAIN, '/buildings', URL).