:- module(repo, [save_buildings/1,save_floors/1,save_passageways/1,save_rooms/1,save_lifts/1,save_maps/1] ).


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

% save Floors
save_floors([]).
save_floors([Floor|Rest]) :-

    Floor = json([floorCode=FloorCode, floorNumber=FloorNumber,_,_,_,buildingID=BuildingId]),
    \+ db:floor(FloorCode,_,_), !,
    write('Saving floor: '), writeln(Floor),
    assertz(db:floor(FloorCode,FloorNumber,BuildingId)),
    save_floors(Rest).

save_floors([_|Rest]) :-
    save_floors(Rest).

% save Rooms
save_rooms([]).
save_rooms([Room|Rest]) :-

    Room = json([roomCode=RoomCode,floor=FloorCode | _]),
    \+ db:room(RoomCode,_), !,
    write('Saving room: '), writeln(Room),
    assertz(db:room(RoomCode,FloorCode)),
    save_rooms(Rest).

save_rooms([_|Rest]) :-
    save_rooms(Rest).


% save Passageways
save_passageways([]).
save_passageways([Passageway|Rest]) :-

    Passageway = json([passageCode=PassagewayCode , floor1=FloorCode1,floor2=FloorCode2 | _]),
    \+ db:passageway(PassagewayCode,_,_), !,
    write('Saving passageway: '), writeln(Passageway),
    assertz(db:passageway(PassagewayCode,FloorCode1,FloorCode2)),
    save_passageways(Rest).

save_passageways([_|Rest]) :-
    save_passageways(Rest).

% save Lifts
save_lifts([]).
save_lifts([Lift|Rest]) :-

    Lift = json([code=LiftCode,buildingCode=BuildingCode,floors=Floors | _]),
    \+ db:lift(LiftCode,_,_), !,
    write('Saving lift: '), writeln(Lift),
    assertz(db:lift(LiftCode,BuildingCode,Floors)),
    save_lifts(Rest).

save_lifts([_|Rest]) :-
    save_lifts(Rest).

%save map
save_maps([]).
save_maps([Map|Rest]):-

    Map = json([floorCode=FloorCode,maze=Maze,passageways=Passageways,elevator=Elevator,rooms=Rooms| _]),

    \+ db:map(FloorCode,_,_,_,_), !,
        write('Saving Map: '), writeln(Map),
        assertz(db:map(FloorCode,Maze,Passageways,Elevator,Rooms)),
        save_maps(Rest).

save_maps([_|Rest]) :-
        save_maps(Rest).


% save tasks
save_tasks([]).
save_tasks([Task|Rest]):-

    Task = json([id=TaskCode,roomDest=RoomDest,roomOrig=RoomOrig| _]),

    \+ db:task(TaskCode,_,_), !,
        write('Saving Task: '), writeln(Task),
        assertz(db:task(TaskCode,RoomOrig,RoomDest)),
        save_tasks(Rest).

save_tasks([_|Rest]) :-
        save_tasks(Rest).


