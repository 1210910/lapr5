% Define o modulo
:- module(main, [bootstrap/0, run_server/0]).

:- use_module('HttpServer/server').
:- use_module('controller/db_controller').

% Bootstrap
bootstrap :-
    db_controller:load_db.

% Main
run_server :-
    server:start(8000),
    bootstrap, !.

:- run_server.