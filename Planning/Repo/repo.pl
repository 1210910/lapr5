:- module(repo, [save_buildings/1]).

:- use_module('../Repo/repo').

% save Buildings
save_buildings([]).
save_buildings([Building|Rest]) :-

    Building = json([code=BuildingCode | _]),
    \+ db:building_code(BuildingCode), !,
    write('Saving building: '), writeln(Building),
    assertz(db:building_code(BuildingCode)),
    save_buildings(Rest).
save_buildings([_|Rest]) :-
    save_buildings(Rest).