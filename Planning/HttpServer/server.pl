% Define module
:- module(server, [start/1, stop/0]).
:- use_module('../controller/getPath_controller').
:- use_module(library(http/http_client)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_header)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_json)).


:- http_handler('/', options_request_handler, [method(options)]).
options_request_handler(_Request) :-
    cors_enable,
    format('~n'). % Responder sem corpo para solicitações OPTIONS

:- http_handler('/data', data_handler, []).
data_handler(_Request) :-
    cors_enable,
    format('Access-Control-Allow-Origin: *\r\n'), % Permitir solicitações de qualquer origem
    format('Content-type: application/json\r\n\r\n'), % Tipo de conteúdo JSON
    Reply = _{ message: "Exemplo de dados JSON do servidor Prolog" },
    format('~q', [Reply]). % Imprimir os dados JSON diretamente

:- http_handler('/rooms', handle_rooms, []).
handle_rooms(Request) :-
    http_parameters(Request,
        [
            param1(Param1, [string]), % Especificando que param1 é uma string
            param2(Param2, [string])  % Especificando que param2 é uma string
        ]),
    getPath_controller:get_path(Param1, Param2, Response),
    cors_enable(Request, [methods([get]), headers([content_type])]),
            format('Access-Control-Allow-Origin: *\r\n'),
            format('Content-type: application/json\r\n\r\n'),
            reply_json(Response).



start(Port) :- % Starts server with 'Port' - http://localhost:Port

    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).




stop :-
    retract(port(Port)), !,
    http_stop_server(Port,_), !.







