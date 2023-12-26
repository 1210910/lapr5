
:- module(db, [building_code/1,floor/3,room/2,passageway/3,lift/3,map/5,task/3]).


:- dynamic(building_code/1). % buildingCode
:- dynamic(floor/3). % floorCode
:- dynamic(room/2). % roomCode
:- dynamic(passageway/3). % passagewayCode
:- dynamic(lift/3). % liftCode
:- dynamic(map/5).
:- dynamic(task/3).


