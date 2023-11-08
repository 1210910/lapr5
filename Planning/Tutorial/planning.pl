% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).

%:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- json_object student(name:string, number:integer).

% Relação entre pedidos HTTP e predicados que os processam
:- http_handler('/lapr5', responde_ola, []).
:- http_handler('/register_user', register_user, []).
:- http_handler('/send_file_post', send_file_post, []).
:- http_handler('/processa_json', p_json, []). % localhost:5000/processa_json?student={name:'José',number:123}

% Criação de servidor HTTP no porto 'Port'
server(Port) :-
        http_server(http_dispatch, [port(Port)]).

% Tratamento de 'http://localhost:5000/lapr5'
responde_ola(_Request) :-
        format('Content-type: text/plain~n~n'),
        format('Olá LAPR5!~n').

% MÉTODO GET: Tratamento de 'http://localhost:5000/register_user?name='José'&sex=male&birth_year=1975'
% ou http_client:http_get('http://localhost:5000/register_user?name=\'José\'&sex=male&birth_year=1975',X,[]).

% MÉTODO POST
% http_client:http_post('http://localhost:5000/register_user', form_data([name='José', sex=male, birth_year=1975]), Reply, []).
register_user(Request) :-
    http_parameters(Request,
                    [ name(Name, []),
                      sex(Sex, [oneof([male,female])]),
                      birth_year(BY, [between(1850,10000)])
                    ]),
    format('Content-type: text/plain~n~n'),
    format('User registered!~n'),
	format('Name: ~w~nSex: ~w~nBirth Year: ~w~n',[Name,Sex,BY]).

% MÉTODO POST enviando um ficheiro de texto
% http_client:http_post('http://localhost:5000/send_file_post', form_data([file=file('./teste.txt')]), Reply, []).
send_file_post(Request) :-
	http_parameters(Request,[ file(X,[])]),
    format('Content-type: text/plain~n~n'),
	format('Received: ~w~n',[X]).


% JSON
p_json(Request) :-
          http_read_json(Request, JSON, [json_object(dict)]),
        % R = json([name=joao,number=3000]),
        % alternativa para não ter que declarar :-json_object
          R = student("joao",JSON.set_user),
          prolog_to_json(R, JSONObject),
          reply_json(JSONObject, [json_object(dict)]).

% Cliente consumidor de json
client(Number):-
          Term = json([set_user = Number]),
          http_post('http://localhost:5000/processa_json', json(Term), Reply, [json_object(dict)]),
          write('Client: '),write(Reply.name),nl,
          write('Client: '),write(Reply.number),nl.
