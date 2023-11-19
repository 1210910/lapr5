m(1,1,1).
m(2,1,1).
m(3,1,1).
m(4,1,1).
m(5,1,1).
m(6,1,1).
m(7,1,1).
m(8,1,1).
m(1,2,0).
m(2,2,0).
m(3,2,0).
m(4,2,0).
m(5,2,0).
m(6,2,0).
m(7,2,0).
m(8,2,1).
m(1,3,0).
m(2,3,0).
m(3,3,0).
m(4,3,0).
m(5,3,0).
m(6,3,0).
m(7,3,0).
m(8,3,1).
m(1,4,0).
m(2,4,0).
m(3,4,0).
m(4,4,0).
m(5,4,0).
m(6,4,0).
m(7,4,0).
m(8,4,1).
m(1,5,1).
m(2,5,1).
m(3,5,1).
m(4,5,1).
m(5,5,0).
m(6,5,0).
m(7,5,0).
m(8,5,1).
m(1,6,1).
m(2,6,1).
m(3,6,1).
m(4,6,1).
m(5,6,0).
m(6,6,0).
m(7,6,0).
m(8,6,1).
m(1,7,1).
m(2,7,1).
m(3,7,1).
m(4,7,1).
m(5,7,0).
m(6,7,0).
m(7,7,0).
m(8,7,1).


:-dynamic ligacel/2.
cria_grafo(_,0):-!.
cria_grafo(Col,Lin):-cria_grafo_lin(Col,Lin),Lin1 is Lin- 1,cria_grafo(Col,Lin1).
cria_grafo_lin(0,_):-!.
cria_grafo_lin(Col,Lin):-m(Col,Lin,0),!,    
ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1, 
((m(ColS,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin)));true)), 
((m(ColA,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin)));true)), 
((m(Col,LinS,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinS)));true)), 
((m(Col,LinA,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinA)));true)),
Col1 is Col-1,
cria_grafo_lin(Col1,Lin).
cria_grafo_lin(Col,Lin):-Col1 is Col-1,cria_grafo_lin(Col1,Lin).



dfs(Orig,Dest,Cam):-
       dfs2(Orig,Dest,[Orig],Cam).
dfs2(Dest,Dest,LA,Cam):-
       reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam):-ligacel(Act,X),\+ member(X,LA), dfs2(X,Dest,[X|LA],Cam).
all_dfs(Orig,Dest,LCam):-findall(Cam,dfs(Orig,Dest,Cam),LCam).
better_dfs(Orig,Dest,Cam):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).
shortlist([L],L,N):-!,length(L,N). shortlist([L|LL],Lm,Nm):-shortlist(LL,Lm1,Nm1),
length(L,NL),
((NL<Nm1,!,Lm=L,Nm is NL);(Lm=Lm1,Nm is Nm1)).

    
bfs(Orig,Dest,Cam):-bfs2(Dest,[[Orig]],Cam).
bfs2(Dest,[[Dest|T]|_],Cam):- reverse([Dest|T],Cam).
bfs2(Dest,[LA|Outros],Cam):- LA=[Act|_],
findall([X|LA],
(Dest\==Act,ligacel(Act,X),\+ member(X,LA)), Novos),
append(Outros,Novos,Todos), bfs2(Dest,Todos,Cam).


liga(a,h). 
liga(b,g). 
liga(b,i). 
liga(g,h). 
liga(h,i). 
liga(i,j).

%a find a path between buildings 30% 
%?- path_buildings(j,a,LBdPath).
% LBdPath = [j, i, b, g, h, a] ; 
% LBdPath = [j, i, h, a]

path_buildings(BdOr,BdDest,LBdPath):-path_buildings2(BdOr,BdDest,[BdOr],LBdPath).
path_buildings2(BdX,BdX,LBdInv,LBdPath):-!,reverse(LBdInv,LBdPath). 
path_buildings2(BdAct,BdDest,LBdPassed,LBdPath):-(liga(BdAct,BdInt);liga(BdInt,BdAct)), \+member(BdInt,LBdPassed), path_buildings2(BdInt,BdDest,[BdInt|LBdPassed],LBdPath).


%b Find all paths between buildings.10% %?- all_path_buildings(i,b,LTPathBd).
% LTPathBd = [[i, b], [i, h, g, b]].

all_path_buildings(BdOr,BdDest,LTPathBd):-findall(LBdPath,path_buildings(BdOr,BdDest,LBdPath),LTPathBd).

floors(a,[a1]). 
floors(b,[b1,b2,b3,b4]). 
floors(g,[g2,g3,g4]). 
floors(h,[h1,h2,h3,h4]). 
floors(i,[i1,i2,i3,i4]). 
floors(j,[j1,j2,j3,j4]).

elevator(b,[b1,b2,b3,b4]). 
elevator(g,[g2,g3,g4]). 
elevator(i,[i1,i2,i3,i4]). 
elevator(j,[j1,j2,j3,j4]).

corridor(a,h,a1,h2).
corridor(b,g,b2,g2).
corridor(b,g,b3,g3). 
corridor(b,i,b3,i3). 
corridor(g,h,g2,h2). 
corridor(g,h,g3,h3). 
corridor(h,i,h2,i2). 
corridor(i,j,i1,j1). 
corridor(i,j,i2,j2). 
corridor(i,j,i3,j3).

% c Find a path between floors of buildings using corridors and elevators. 

path_floors(FloorOr,FloorDest,LBdPath,LCon):- 
    floors(BdOr,LFloorOr),member(FloorOr,LFloorOr),
    floors(BdDest,LFloorsDest),member(FloorDest,LFloorsDest), path_buildings(BdOr,BdDest,LBdPath), follow_floors(FloorOr,FloorDest,LBdPath,LCon).
    follow_floors(FloorDest,FloorDest,_,[]). 
follow_floors(FloorDest1,FloorDest,[BdDest],[elev(FloorDest1,FloorDest)]):-
    FloorDest\==FloorDest1, elevator(BdDest,LFloors),member(FloorDest1,LFloors), member(FloorDest,LFloors).
follow_floors(FloorAct,FloorDest,[BdAct,BdNext|LOthersBd],[cor(FloorAct,FloorNext)|LOtherCon]):- 
    (corridor(BdAct,BdNext,FloorAct,FloorNext);corridor(BdNext,BdAct,FloorNext,FloorAct)), follow_floors(FloorNext,FloorDest,[BdNext|LOthersBd],LOtherCon).
follow_floors(FloorAct,FloorDest,[BdAct,BdNext|LOthersBd], [elev(FloorAct,FloorAct1),cor(FloorAct1,FloorNext)|LOtherCon]):-
    (corridor(BdAct,BdNext,FloorAct1,FloorNext); corridor(BdNext,BdAct,FloorNext,FloorAct1)),FloorAct1\==FloorAct, elevator(BdAct,LFloors),member(FloorAct,LFloors),member(FloorAct1,LFloors), follow_floors(FloorNext,FloorDest,[BdNext|LOthersBd],LOtherCon).



% d Choose the path that involves fewer elevator usages, and in case of equality, less usage of corridors, fewer transfers.
better_path_floors(FloorOr,FloorDest,LBetterCon):-
    findall(LLCon,path_floors(FloorOr,FloorDest,_,LLCon),LLLCon),
    less_elevators(LLLCon,LBetterCon,_,_).
less_elevators([LLCon],LLCon,NElev,NCor):-count(LLCon,NElev,NCor). less_elevators([LCon|OthersLCon],LConR,NElevR,NCorR):-
        less_elevators(OthersLCon,LConM,NElev,NCor),
        count(LCon,NElev1,NCor1),
        (((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,
        NElevR is NElev1, NCorR is NCor1,LConR=LCon);
        (NElevR is NElev,NCorR is NCor,LConR=LConM)).
count([],0,0). count([elev(_,_)|L],NElev,NCor):-count(L,NElevL,NCor),NElev is NElevL+1. count([cor(_,_)|L],NElev,NCor):-count(L,NElev,NCorL),NCor is NCorL+1.