% Define module
:- module(server, [start/1, stop/0]).

:- use_module(library(http/http_client)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).


start(Port) :- % Starts server with 'Port' - http://localhost:Port
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stop :-
    retract(port(Port)), !,
    http_stop_server(Port,_), !.