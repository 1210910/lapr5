import * as THREE from "three";
import Orientation from "./orientation.js";
import CubeTexture from "./cubetexture.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import {inject} from "@angular/core";


export default class UserInterface extends GUI {
    popUpCreated = false;
    thumbRaiser ;
    submitedPath = false;
    submitPath = null;
    constructor(thumbRaiser,build) {
        super();
        this.thumbRaiser = thumbRaiser;

        const audioCallback = function (enabled) {
            if (!enabled) {
                thumbRaiser.audio.stopAll();
            }
        }

        const textureCallback = function (options, name) {
            thumbRaiser.cubeTexture = new CubeTexture(thumbRaiser.cubeTexturesParameters.skyboxes[options.indexOf(name)]);
            thumbRaiser.buildCreditsPanel();
        }

        const createEmoteCallback = function (animations, name) {
            callbacks[name] = function () {
                animations.fadeToAction(name, 0.2);
            };
            emotesFolder.add(callbacks, name);
        }

        const positionCallback = function (light, distance, orientation) {
            const position = light.orientationToPosition(distance, orientation);
            light.position.set(position.x, position.y, position.z);
        }

        this.resetUserInterface = function () {
            this.reset();
            thumbRaiser.fixedViewCamera.fogDensity = thumbRaiser.fixedViewCamera.initialFogDensity;
            thumbRaiser.firstPersonViewCamera.fogDensity = thumbRaiser.firstPersonViewCamera.initialFogDensity;
            thumbRaiser.thirdPersonViewCamera.fogDensity = thumbRaiser.thirdPersonViewCamera.initialFogDensity;
            thumbRaiser.topViewCamera.fogDensity = thumbRaiser.topViewCamera.initialFogDensity;
            this.fogParameters.density = thumbRaiser.activeViewCamera.fogDensity;
        }

        const fontSize = "1.5vmin";

        this.domElement.style.position = "absolute";
        this.domElement.style.right = "0.5vw";
        this.domElement.style.top = "1.0vh";
        this.domElement.style.fontSize = fontSize;

        // Create the audio folder
        const audioFolder = this.addFolder("Audio");
        audioFolder.domElement.style.fontSize = fontSize;
        audioFolder.add(thumbRaiser.audio, "enabled").onChange(enabled => audioCallback(enabled));
        audioFolder.add(thumbRaiser.audio, "volume", thumbRaiser.audio.volumeMin, thumbRaiser.audio.volumeMax, thumbRaiser.audio.volumeStep).onChange(volume => thumbRaiser.audio.listener.setMasterVolume(volume));
        audioFolder.close();

        // Create the skyboxes folder and add cube textures
        const skyboxesFolder = this.addFolder("Skyboxes");
        skyboxesFolder.domElement.style.fontSize = fontSize;
        const cubeTexturesParameters = { name: thumbRaiser.cubeTexturesParameters.skyboxes[thumbRaiser.cubeTexturesParameters.selected].name };
        const cubeTexturesOptions = [];
        for (let i = 0; i < thumbRaiser.cubeTexturesParameters.skyboxes.length; i++) {
            cubeTexturesOptions[i] = thumbRaiser.cubeTexturesParameters.skyboxes[i].name;
        }
        skyboxesFolder.add(cubeTexturesParameters, "name").options(cubeTexturesOptions).onChange(name => textureCallback(cubeTexturesOptions, name));
        skyboxesFolder.close();

        // Create the character folder
        const characterFolder = this.addFolder("Character");
        characterFolder.domElement.style.fontSize = fontSize;

        // Create the emotes folder and add emotes
        const emotesFolder = characterFolder.addFolder("Emotes");
        emotesFolder.domElement.style.fontSize = fontSize;
        const callbacks = [];
        for (let i = 0; i < thumbRaiser.animations.emotes.length; i++) {
            createEmoteCallback(thumbRaiser.animations, thumbRaiser.animations.emotes[i]);
        }
        emotesFolder.close();

        // Create the expressions folder and add expressions
        const expressionsFolder = characterFolder.addFolder("Expressions");
        expressionsFolder.domElement.style.fontSize = fontSize;
        const expressions = Object.keys(thumbRaiser.player.face.morphTargetDictionary);
        for (let i = 0; i < expressions.length; i++) {
            expressionsFolder.add(thumbRaiser.player.face.morphTargetInfluences, i, 0.0, 1.0, 0.01).name(expressions[i]);
        }
        expressionsFolder.close();

        characterFolder.close();

        // Create the lights folder
        const lightsFolder = this.addFolder("Lights");
        lightsFolder.domElement.style.fontSize = fontSize;

        // Create the ambient light folder
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        ambientLightFolder.domElement.style.fontSize = fontSize;
        const ambientLightParameters = { color: "#" + new THREE.Color(thumbRaiser.ambientLight.color).getHexString() };
        ambientLightFolder.add(thumbRaiser.ambientLight, "visible").listen();
        ambientLightFolder.addColor(ambientLightParameters, "color").onChange(color => thumbRaiser.ambientLight.color.set(color));
        ambientLightFolder.add(thumbRaiser.ambientLight, "intensity", thumbRaiser.ambientLight.intensityMin, thumbRaiser.ambientLight.intensityMax, thumbRaiser.ambientLight.intensityStep);
        ambientLightFolder.close();

        // Create the directional light folder
        const directionalLightFolder = lightsFolder.addFolder("Directional light");
        directionalLightFolder.domElement.style.fontSize = fontSize;
        const directionalLightParameters = { color: "#" + new THREE.Color(thumbRaiser.directionalLight.color).getHexString() };
        directionalLightFolder.add(thumbRaiser.directionalLight, "visible").listen();
        directionalLightFolder.addColor(directionalLightParameters, "color").onChange(color => thumbRaiser.directionalLight.color.set(color));
        directionalLightFolder.add(thumbRaiser.directionalLight, "intensity", thumbRaiser.directionalLight.intensityMin, thumbRaiser.directionalLight.intensityMax, thumbRaiser.directionalLight.intensityStep);
        directionalLightFolder.add(thumbRaiser.directionalLight.orientation, "h", thumbRaiser.directionalLight.orientationMin.h, thumbRaiser.directionalLight.orientationMax.h, thumbRaiser.directionalLight.orientationStep.h).onChange(h => positionCallback(thumbRaiser.directionalLight, thumbRaiser.directionalLight.distance, new Orientation(h, thumbRaiser.directionalLight.orientation.v)));
        directionalLightFolder.add(thumbRaiser.directionalLight.orientation, "v", thumbRaiser.directionalLight.orientationMin.v, thumbRaiser.directionalLight.orientationMax.v, thumbRaiser.directionalLight.orientationStep.v).onChange(v => positionCallback(thumbRaiser.directionalLight, thumbRaiser.directionalLight.distance, new Orientation(thumbRaiser.directionalLight.orientation.h, v)));
        directionalLightFolder.close();

        // Create the spotlight folder
        const spotLightFolder = lightsFolder.addFolder("Spotlight");
        spotLightFolder.domElement.style.fontSize = fontSize;
        const spotLightParameters = { color: "#" + new THREE.Color(thumbRaiser.spotLight.color).getHexString(), angle: THREE.MathUtils.radToDeg(thumbRaiser.spotLight.angle) };
        spotLightFolder.add(thumbRaiser.spotLight, "visible").listen();
        spotLightFolder.addColor(spotLightParameters, "color").onChange(color => thumbRaiser.spotLight.color.set(color));
        spotLightFolder.add(thumbRaiser.spotLight, "intensity", thumbRaiser.spotLight.intensityMin, thumbRaiser.spotLight.intensityMax, thumbRaiser.spotLight.intensityStep);
        spotLightFolder.add(thumbRaiser.spotLight, "distance", thumbRaiser.spotLight.distanceMin, thumbRaiser.spotLight.distanceMax, thumbRaiser.spotLight.distanceStep);
        spotLightFolder.add(spotLightParameters, "angle", thumbRaiser.spotLight.angleMin, thumbRaiser.spotLight.angleMax, thumbRaiser.spotLight.angleStep).onChange(angle => thumbRaiser.spotLight.angle = THREE.MathUtils.degToRad(angle));
        spotLightFolder.add(thumbRaiser.spotLight, "penumbra", thumbRaiser.spotLight.penumbraMin, thumbRaiser.spotLight.penumbraMax, thumbRaiser.spotLight.penumbraStep);
        spotLightFolder.add(thumbRaiser.spotLight.position, "x", thumbRaiser.spotLight.positionMin.x, thumbRaiser.spotLight.positionMax.x, thumbRaiser.spotLight.positionStep.x);
        spotLightFolder.add(thumbRaiser.spotLight.position, "y", thumbRaiser.spotLight.positionMin.y, thumbRaiser.spotLight.positionMax.y, thumbRaiser.spotLight.positionStep.y);
        spotLightFolder.add(thumbRaiser.spotLight.position, "z", thumbRaiser.spotLight.positionMin.z, thumbRaiser.spotLight.positionMax.z, thumbRaiser.spotLight.positionStep.z);
        spotLightFolder.close();

        const pathFolder = this.addFolder("Path");
        pathFolder.close();

        let rooms = [];
        for (let i = 0; i < build.build.length; i++) {
            for (let j = 0; j < build.build[i].floors.length; j++) {
                for (let k = 0; k < build.build[i].floors[j].rooms.length; k++) {
                    rooms.push(build.build[i].floors[j].rooms[k]);
                }
            }
        }
        console.log(rooms);

        let roomsOfFloor = [];
        const fileName = this.thumbRaiser.mazeParameters.url.split("/")[5];
        const floor = fileName.split(".")[0];
        console.log(floor);
        for (let i = 0; i < build.build.length; i++) {
            for (let j = 0; j < build.build[i].floors.length; j++) {
                console.log(build.build[i].floors[j].floorCode);
                if (build.build[i].floors[j].floorCode == floor) {
                    console.log("ENTREI");
                    roomsOfFloor = build.build[i].floors[j].rooms;
                    console.log(build.build[i].floors[j].rooms);
                    break;
                }
            }
        }

        console.log("ROOMS OF FLOOR")
        console.log(roomsOfFloor);


        let roomsControlOr = null;
        let roomsControlDest = null;

        let or = rooms[0].roomCode;
        let dest = rooms[0].roomCode;

        // Create the path folder
        // Add dropdowns for room of origin and room of destiny
        const roomsOr = roomsOfFloor.map(room => room.roomCode);
        roomsControlOr = pathFolder.add({room: roomsOr[0]}, 'roomOfOrigin', roomsOr);
        roomsControlOr.onChange(function (room) {
            or = room
        });
        let romtDestTemp = rooms[0].roomCode
        const roomsDest = rooms.map(room => room.roomCode);

        roomsControlDest = pathFolder.add({room: roomsDest[0]}, 'roomOfDestiny', roomsDest);
        roomsControlDest.onChange(function (room) {
            dest = room
        });
        this.roomOfDestiny = romtDestTemp;
        // Add a submit button
        pathFolder.add({submit: () => this.getpath(or,dest) }, 'submit');

        // Create the flashlight folder
        const flashLightFolder = lightsFolder.addFolder("Flashlight");
        flashLightFolder.domElement.style.fontSize = fontSize;
        const flashLightParameters = { color: "#" + new THREE.Color(thumbRaiser.flashLight.color).getHexString(), angle: THREE.MathUtils.radToDeg(thumbRaiser.flashLight.angle) };
        flashLightFolder.add(thumbRaiser.flashLight, "visible").listen();
        flashLightFolder.addColor(flashLightParameters, "color").onChange(color => thumbRaiser.flashLight.color.set(color));
        flashLightFolder.add(thumbRaiser.flashLight, "intensity", thumbRaiser.flashLight.intensityMin, thumbRaiser.flashLight.intensityMax, thumbRaiser.flashLight.intensityStep);
        flashLightFolder.add(thumbRaiser.flashLight, "distance", thumbRaiser.flashLight.distanceMin, thumbRaiser.flashLight.distanceMax, thumbRaiser.flashLight.distanceStep);
        flashLightFolder.add(flashLightParameters, "angle", thumbRaiser.flashLight.angleMin, thumbRaiser.flashLight.angleMax, thumbRaiser.flashLight.angleStep).onChange(angle => thumbRaiser.flashLight.angle = THREE.MathUtils.degToRad(angle));
        flashLightFolder.add(thumbRaiser.flashLight, "penumbra", thumbRaiser.flashLight.penumbraMin, thumbRaiser.flashLight.penumbraMax, thumbRaiser.flashLight.penumbraStep);
        flashLightFolder.add(thumbRaiser.flashLight.orientation, "h", thumbRaiser.flashLight.orientationMin.h, thumbRaiser.flashLight.orientationMax.h, thumbRaiser.flashLight.orientationStep.h).onChange(h => positionCallback(thumbRaiser.flashLight, thumbRaiser.flashLight.distance, new Orientation(h, thumbRaiser.flashLight.orientation.v)));
        flashLightFolder.add(thumbRaiser.flashLight.orientation, "v", thumbRaiser.flashLight.orientationMin.v, thumbRaiser.flashLight.orientationMax.v, thumbRaiser.flashLight.orientationStep.v).onChange(v => positionCallback(thumbRaiser.flashLight, thumbRaiser.flashLight.distance, new Orientation(thumbRaiser.flashLight.orientation.h, v)));
        flashLightFolder.close();

        lightsFolder.close();

        // Create the shadows folder
        const shadowsFolder = this.addFolder("Shadows");
        shadowsFolder.domElement.style.fontSize = fontSize;
        shadowsFolder.add(thumbRaiser.shadowsParameters, "enabled").listen();
        shadowsFolder.close();

        // Create the fog folder
        const fogFolder = this.addFolder("Fog");
        fogFolder.domElement.style.fontSize = fontSize;
        this.fogParameters = { color: "#" + new THREE.Color(thumbRaiser.fog.color).getHexString(), density: thumbRaiser.activeViewCamera.fogDensity };
        fogFolder.add(thumbRaiser.fog, "enabled").listen();
        fogFolder.addColor(this.fogParameters, "color").onChange(color => thumbRaiser.fog.color.set(color));
        fogFolder.add(this.fogParameters, "density", thumbRaiser.fog.densityMin, thumbRaiser.fog.densityMax, thumbRaiser.fog.densityStep).onChange(density => thumbRaiser.activeViewCamera.fogDensity = density).listen();
        fogFolder.close();

        // Create the collision detection folder
        const collisionDetectionFolder = this.addFolder("Collision detection");
        collisionDetectionFolder.domElement.style.fontSize = fontSize;
        const collisionDetectionParameters = { method: thumbRaiser.collisionDetectionParameters.method == "bc-aabb" ? "BC / AABB" : "OBB / AABB" };
        const collisionDetectionOptions = ["BC / AABB", "OBB / AABB"];
        collisionDetectionFolder.add(collisionDetectionParameters, "method").options(collisionDetectionOptions).onChange(name => thumbRaiser.setCollisionDetectionMethod(["bc-aabb", "obb-aabb"][collisionDetectionOptions.indexOf(name)]));
        collisionDetectionFolder.add(thumbRaiser.collisionDetectionParameters.boundingVolumes, "visible").onChange(visible => thumbRaiser.setBoundingVolumesVisibility(visible)).listen();
        collisionDetectionFolder.close();

      let gui = null;
      let buildingControl = null;
      let floorControl = null;
      const buildings = build.build;
      console.log(buildings);
      function createGUI(building) {
        // Remova a GUI antiga, se existir
        if (gui) {
          gui.destroy();
        }

        // Crie uma nova GUI
        gui = new GUI({ hideable: false });

        // Crie uma pasta para a seleção do edifício
        const buildingNames =  buildings.map(b => b.code);

        buildingControl = gui.add({ building }, 'building', buildingNames).onChange(createGUI);
        let i=3;
        for (let index = 0; index < buildings.length; index++) {
          if(buildings[index].code ==building ){
            i=index;
          }
        }
        // Crie uma pasta para a seleção do piso, se houver pisos disponíveis
        const floors = buildings[i].floors.map(f => f.floorCode);
        if (floors.length > 1 && floors[0] !== '') {
          console.log(floors);
          floorControl = gui.add({ floor: floors[0] }, 'floor', floors);
          floorControl.onChange(function(floor) {
            console.log('Piso selecionado:', floor);
            thumbRaiser.loadMap(floor);  // Carregue o mapa quando o piso for alterado
          });
        }else if(floors.length==1 && floors[0] !== ''){
          console.log(floors);
          floorControl = gui.add({ floor: floors[0] }, 'floor', floors);
          console.log('Piso selecionado:', floors[0]);
            thumbRaiser.loadMap(floor);  // Carregue o mapa quando o piso for alterado
        }else {
          gui.add({ message: 'Este edifício não tem pisos' }, 'message');
        }
      }





      createGUI(Object.keys(buildings)[0]);


        // Create the reset button
        this.add({ reset: () => this.resetUserInterface() }, "reset");

        this.close();
    }

    getPathHttp(room1, room2) {
        return new Promise((resolve, reject) => {

            const url = 'http://localhost:8000/rooms?param1='+room1+'&param2='+room2 ;
            const httprequest = new XMLHttpRequest();
            httprequest.open('GET', url, true);

            //let response;
            httprequest.onload = function () {

                resolve(httprequest.responseText);

            }
            httprequest.send();

        });
    }

    async getpath(room1,room2) {



        const result = await this.getPathHttp(room1, room2);

        if (result != "") {
            alert(JSON.stringify(result));

            // tirar as duas primeiras linhas do result antes de fazer o parse  (result = result.substring(2);)

            // @ts-ignore
            const resultString = result;
            const index = resultString.indexOf('{');
            resultString.substring(index);

            console.log(index);
            console.log(resultString.substring(index));

            // @ts-ignore
            const obj = JSON.parse(resultString.substring(index));


            const path = obj.path;
            const building = obj.building;
            const floor = obj.floor;

            console.log (path);

            this.submitedPath = true;

            const array = path.split("cam('").filter(Boolean).map(cam => "cam('" + cam);

            array.shift();

            this.submitPath= array;



        }



    }



        showSelectionFloors(building, currentFloor)
        {
            if (!this.popUpCreated) {
                const buildings = building.build;

                console.log(buildings);
                const popUp = document.createElement('div');
                popUp.id = 'popUp';
                popUp.style.position = 'absolute';
                popUp.style.top = '50%';
                popUp.style.left = '50%';
                popUp.style.transform = 'translate(-50%, -50%)';
                popUp.style.backgroundColor = 'white';
                popUp.style.padding = '20px';
                popUp.style.zIndex = '100';
                popUp.style.borderRadius = '10px';
                popUp.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.25)';
                popUp.style.display = 'flex';
                popUp.style.flexDirection = 'column';
                popUp.style.alignItems = 'center';
                popUp.style.justifyContent = 'center';
                popUp.style.fontFamily = 'sans-serif';

                // create a title
                const title = document.createElement('h1');
                title.style.fontSize = '32px';
                title.style.margin = '0';
                title.style.marginBottom = '20px';
                title.style.textAlign = 'center';
                title.style.color = '#333';
                title.textContent = 'Selecione o piso';
                popUp.appendChild(title);

                // create a select
                const select = document.createElement('select');
                select.style.fontSize = '16px';
                select.style.padding = '10px';
                select.style.marginBottom = '20px';
                select.style.borderRadius = '5px';
                select.style.border = '1px solid #ccc';
                select.style.backgroundColor = '#fff';
                select.style.outline = 'none';
                select.style.color = '#333';
                select.style.fontFamily = 'sans-serif';

                // create options

                console.log(currentFloor.charAt(0));
                let i = 0;

                for (let index = 0; index < buildings.length; index++) {
                    if (buildings[index].code == currentFloor.charAt(0)) {
                        i = index;
                    }
                }
                const floors = buildings[i].floors.map(f => f.floorCode);


                for (let i = 0; i < floors.length; i++) {
                    const option = document.createElement('option');
                    option.textContent = floors[i];
                    option.value = floors[i];
                    select.appendChild(option);
                }
                popUp.appendChild(select);


                // create a button
                const button = document.createElement('button');
                button.style.fontSize = '16px';
                button.style.padding = '10px';
                button.style.borderRadius = '5px';
                button.style.border = '1px solid #ccc';
                button.style.backgroundColor = '#fff';
                button.style.outline = 'none';
                button.style.color = '#333';
                button.style.fontFamily = 'sans-serif';
                button.textContent = 'Selecionar';
                popUp.appendChild(button);

                // add the popup to the document

                document.body.appendChild(popUp);

                // add an event listener to the button

                button.addEventListener('click', () => {
                    const floor = select.value;
                    this.thumbRaiser.loadMap(floor);  // Carregue o mapa quando o piso for alterado
                    document.body.removeChild(popUp);
                    this.popUpCreated = false;



                });
                this.popUpCreated = true;
            }
        }
    showSelectionFloorsAutomatic(floor)
    {
        if (!this.popUpCreated) {


            const popUp = document.createElement('div');
            popUp.id = 'popUp';
            popUp.style.position = 'absolute';
            popUp.style.top = '50%';
            popUp.style.left = '50%';
            popUp.style.transform = 'translate(-50%, -50%)';
            popUp.style.backgroundColor = 'white';
            popUp.style.padding = '20px';
            popUp.style.zIndex = '100';
            popUp.style.borderRadius = '10px';
            popUp.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.25)';
            popUp.style.display = 'flex';
            popUp.style.flexDirection = 'column';
            popUp.style.alignItems = 'center';
            popUp.style.justifyContent = 'center';
            popUp.style.fontFamily = 'sans-serif';

            // create a title
            const title = document.createElement('h1');
            title.style.fontSize = '32px';
            title.style.margin = '0';
            title.style.marginBottom = '20px';
            title.style.textAlign = 'center';
            title.style.color = '#333';
            title.textContent = 'A ir para o piso ' + floor;
            popUp.appendChild(title);




            // add the popup to the document

            document.body.appendChild(popUp);

            // add an event listener to the button

            setTimeout(() => {
                this.thumbRaiser.isMoving = false;
                this.thumbRaiser.nextFloor = undefined;
                this.thumbRaiser.player.currentStep = 0;
                document.body.removeChild(popUp);
                this.popUpCreated = false;
                this.thumbRaiser.loadMap(floor);  // Carregue o mapa após 3 segundos
            }, 3000);

            this.popUpCreated = true;
        }

    }

        hideSelectionFloors()
        {
            const popUp = document.getElementById('popUp');
            if (popUp) {
                document.body.removeChild(popUp);
                this.popUpCreated = false;
            }
        }

        showConfirmAutomatic(floor, passageway)
        {
            if (!this.popUpCreated) {


                const popUp = document.createElement('div');
                popUp.id = 'popUp';
                popUp.style.position = 'absolute';
                popUp.style.top = '50%';
                popUp.style.left = '50%';
                popUp.style.transform = 'translate(-50%, -50%)';
                popUp.style.backgroundColor = 'white';
                popUp.style.padding = '20px';
                popUp.style.zIndex = '100';
                popUp.style.borderRadius = '10px';
                popUp.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.25)';
                popUp.style.display = 'flex';
                popUp.style.flexDirection = 'column';
                popUp.style.alignItems = 'center';
                popUp.style.justifyContent = 'center';
                popUp.style.fontFamily = 'sans-serif';

                // create a title
                const title = document.createElement('h1');
                title.style.fontSize = '32px';
                title.style.margin = '0';
                title.style.marginBottom = '20px';
                title.style.textAlign = 'center';
                title.style.color = '#333';
                title.textContent = 'A ir para o piso ' + floor;
                popUp.appendChild(title);




                // add the popup to the document

                document.body.appendChild(popUp);

                // add an event listener to the button

                setTimeout(() => {
                    this.thumbRaiser.isMoving = false;
                    this.thumbRaiser.nextFloor = undefined;
                    this.thumbRaiser.player.currentStep = 0;
                    document.body.removeChild(popUp);
                    this.popUpCreated = false;
                    this.thumbRaiser.loadMap(floor,passageway);  // Carregue o mapa após 3 segundos
                }, 3000);


                this.popUpCreated = true;
            }

        }

        showConfirm(floor, passageway)
        {
            if (!this.popUpCreated) {


                const popUp = document.createElement('div');
                popUp.id = 'popUp';
                popUp.style.position = 'absolute';
                popUp.style.top = '50%';
                popUp.style.left = '50%';
                popUp.style.transform = 'translate(-50%, -50%)';
                popUp.style.backgroundColor = 'white';
                popUp.style.padding = '20px';
                popUp.style.zIndex = '100';
                popUp.style.borderRadius = '10px';
                popUp.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.25)';
                popUp.style.display = 'flex';
                popUp.style.flexDirection = 'column';
                popUp.style.alignItems = 'center';
                popUp.style.justifyContent = 'center';
                popUp.style.fontFamily = 'sans-serif';

                // create a title
                const title = document.createElement('h1');
                title.style.fontSize = '32px';
                title.style.margin = '0';
                title.style.marginBottom = '20px';
                title.style.textAlign = 'center';
                title.style.color = '#333';
                title.textContent = 'Confirme se deseja ir para o piso ' + floor;
                popUp.appendChild(title);


                // create a button
                const button = document.createElement('button');
                button.style.fontSize = '16px';
                button.style.padding = '10px';
                button.style.borderRadius = '5px';
                button.style.border = '1px solid #ccc';
                button.style.backgroundColor = '#fff';
                button.style.outline = 'none';
                button.style.color = '#333';
                button.style.fontFamily = 'sans-serif';
                button.textContent = 'Confirmar';
                popUp.appendChild(button);

                // add the popup to the document

                document.body.appendChild(popUp);

                // add an event listener to the button

                button.addEventListener('click', () => {

                    this.thumbRaiser.loadMap(floor, passageway);  // Carregue o mapa quando o piso for alterado
                    document.body.removeChild(popUp);
                    this.popUpCreated = false;


                });
                this.popUpCreated = true;
            }

        }
        setVisibility(visible)
        {
            if ("show" in this && "hide" in this) {
                if (visible) {
                    this.show();
                } else {
                    this.hide();
                }
            } else { // Some lil-gui versions do not implement show() / hide() methods
                if (visible) {
                    this.domElement.style.display = "block";
                } else {
                    this.domElement.style.display = "none";
                }
            }
        }
    }

