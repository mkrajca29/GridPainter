<template>
  <div id="page">
    <div class="flex justify-between mx-32 border-b-2 border-base_gray_dark py-3 mb-3">

    <div ref="draggableContainer" v-if="this.showSettings" class="absolute rounded-xl top-24 left-32 w-52 z-10 opacity-60 hover:opacity-100 bg-base_gray_dark" id="draggable-container">
        <div id="draggable-header" class="flex px-2 w-full h-10 rounded-t-xl bg-green-800 items-center cursor-move" @mousedown="dragMouseDown">
          <img src="@/assets/gear.svg" class="w-6" alt="settings">
          <h1 class="font-bold mx-auto">SETTINGS</h1>          
        </div>
        <div class="flex flex-col justify-center items-center mx-1 my-5">
          <div class="flex flex-row leading-tight	">
            <button @click="editCanvasSize('magnifyW')" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">+</button>
            <input type="text" v-model="canvas.canvasWidth" class="h-6 w-10 text-black text-center bg-base_gray mx-1">
            <button @click="editCanvasSize('shrinkW')" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">-</button>
          </div>
          <span class="text-xs text-black">CHANGE WIDTH</span>
        </div>
        <div class="flex flex-col justify-center items-center mx-1 my-5">
          <div class="flex flex-row leading-tight	">
            <button @click="editCanvasSize('magnifyH')" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">+</button>
            <input type="text" v-model="canvas.canvasHeight" class="h-6 w-10 text-black text-center bg-base_gray mx-1">
            <button @click="editCanvasSize('shrinkH')" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">-</button>
          </div>
          <span class="text-xs text-black">CHANGE HEIGHT</span>
        </div>
        <div class="flex flex-col justify-center items-center mx-1 my-5">
          <div class="flex flex-row leading-tight	">
            <button @click="editTileSize('magnify')" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">+</button>
            <input type="text" v-model="canvas.tileSize" class="h-6 w-10 text-black text-center bg-base_gray mx-1">
            <button @click="editTileSize('shrink')" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">-</button>
          </div>
          <span class="text-xs text-black">CHANGE TILE</span>
        </div>

        <div class="flex flex-col justify-center items-center">
          <p class="text-center">INSERT IMAGE:</p> 
          <form class="flex flex-col justify-center" @submit.prevent="insertImage($event)">
            <input type="text" placeholder="Inser image URL" name="image" class="text-black rounded-md px-2 mt-2 w-36" />
            <button class="px-5 py-1 mt-2 rounded-lg bg-base_gray hover:bg-green-800">INSERT</button>
          </form>             
          <div v-if="this.image.url" class="flex flex-row mt-2">
            <h1 class="mr-1">X</h1>
            <button @click="this.image.x += this.canvas.tileSize" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">+</button>
            <button @click="this.image.x -= this.canvas.tileSize" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">-</button>
            <h1 class="ml-2 mr-1">Y</h1>
            <button @click="this.image.y += this.canvas.tileSize" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">+</button>
            <button @click="this.image.y -= this.canvas.tileSize" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">-</button>
          </div> 
          <div v-if="this.image.url" class="flex flex-row mt-2">
            <h1 class="ml-2 mr-1">OPACITY</h1>
            <button @click="this.image.opacity += 0.1" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">+</button>
            <button @click="this.image.opacity -= 0.1" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">-</button>
          </div> 
          <div v-if="this.image.url" class="flex flex-row mt-2">
            <h1 class="mr-1">SIZE</h1>
            <button @click="this.image.width += this.canvas.tileSize" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">+</button>
            <button @click="this.image.width -= this.canvas.tileSize" class="w-6 h-6 flex justify-center self-center rounded-full bg-base_gray hover:bg-green-800">-</button>
          </div>           
          <p class="text-center mt-5">INSERT COORDINATES:</p> 
          <form class="flex flex-col justify-center" @submit.prevent="importCoords(inputData)">
            <input v-model="inputData" type="text" placeholder="Inser coordinates" class="text-black rounded-md px-2 mt-2 w-36" />
            <button class="px-5 py-1 mt-2 mb-5 rounded-lg bg-base_gray hover:bg-green-800">INSERT</button>
          </form>      
          <button class="px-5 py-1 mb-5 rounded-lg bg-red-600 hover:bg-green-800 w-36" v-if="this.rectangles.length > 0" v-clipboard="exportCoords">
            COPY OUTPUT
          </button>
        </div>

    </div>

      <div class="flex flex-row items-center">        
        <div @click="this.showSettings = !this.showSettings" :class="{activeSettings: this.showSettings}" class="w-10 h-10 flex justify-center cursor-pointer rounded-full bg-base_gray_dark hover:bg-green-800 active:bg-red-600">
          <img src="@/assets/gear.svg" class="w-6" alt="settings">
        </div>
        <h1 class="font-bold text-2xl ml-4">GRID PAINTER</h1>         
      </div>
      
      <div class="flex flex-row">
        <div class="flex flex-col justify-center items-center mx-1">
          <input type="color" v-model="this.mainRectangle.color" @change="changeColor($event)" class="h-6 w-6 bg-base_gray mx-1 cursor-pointer">
          <span class="text-xs text-black">COLOR</span>
        </div>
        <buttonPadding v-if="drawing" :buttonName="'ARROWS'" :buttonLabel="'MOVE'" />
        <buttonPadding v-if="drawing" @click="add()" :buttonName="'SHIFT'" :buttonLabel="'ADD'" />
        <buttonRounded v-if="rectangles.length > 0 && drawing" @click="restore = exportCoords; deleted = true; deleteAll();" :buttonName="'D'" :buttonLabel="'DELETE ALL'" />
        <buttonRounded v-if="rectangles.length > 0 && drawing" @click="removeRectangle()" :buttonName="'R'" :buttonLabel="'REMOVE'" />
        <buttonRounded v-if="rectangles.length > 0 && drawing" @click="play()" :buttonName="'P'" :buttonLabel="'PLAY'" />
        <buttonRounded v-if="drawing == false" @click="edit()" :buttonName="'E'" :buttonLabel="'EDIT'" />
        <button v-if="restore.length > 18 && deleted" @click="restoreCoords()" class="px-4 h-10 mx-1 flex justify-center items-center self-center rounded-full bg-green-800 hover:bg-red-600">BACK</button>
      </div>
    </div>

    <div class="w-max mx-auto relative">
    <img
      :src="image.url"
      class="absolute"
      :style="`left: ${this.image.x}px; top: ${this.image.y}px; opacity: ${this.image.opacity}; width: ${this.image.width}px`"
    />
      <canvas
        ref="canvasDrawing"
        :width="canvas.canvasWidth"
        :height="canvas.canvasHeight"
      ></canvas>
    </div>
    <br />
  </div>
</template>

<script>
import buttonPadding from "@/components/buttonPadding.vue";
import buttonRounded from "@/components/buttonRounded.vue";

export default {
  components: {
    buttonPadding,
    buttonRounded
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      canvas: {
        canvasWidth: 1200,
        canvasHeight: 500,
        tileSize: 10,
        numberOfTilesX: 0,
        numberOfTilesY: 0,
        color: "#343a40"
      },
      mainRectangle: {
        x: 0,
        y: 0,
        color: "#FFFFFF" //
      },
      
      rectangles: [],

      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },

      image: {
        url: null,
        width: 200,
        opacity: 0.4,
        x: 100,
        y: 100
      },

      drawing: true,
      showColors: false,
      showSettings: false,
      insertForm: false,
      showCanvasSetings: false,
      deleted: false,
      inputData: "",
      hex: "",
      infoBox: true,
      restore: "",
      drawingSpeed: 10,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    window.addEventListener(
      "beforeunload",
      () => {
        this.setItemToStorage(this.exportCoords);
      },
      false
    );
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    this.ctx = this.$refs.canvasDrawing.getContext("2d");
    this.setCanvasSizeByDevice();
    this.updateCanvasSize();

    let demo = "800:500:10/30,20,#05f0b5|40,20,#05f0b5|50,20,#05f0b5|60,20,#05f0b5|70,20,#05f0b5|50,30,#05f0b5|50,40,#05f0b5|50,50,#05f0b5|50,60,#05f0b5|90,20,#05f0b5|90,30,#05f0b5|90,40,#05f0b5|90,50,#05f0b5|90,60,#05f0b5|100,20,#05f0b5|110,20,#05f0b5|120,20,#05f0b5|100,40,#05f0b5|110,40,#05f0b5|120,40,#05f0b5|100,60,#05f0b5|110,60,#05f0b5|120,60,#05f0b5|170,20,#05f0b5|160,20,#05f0b5|150,20,#05f0b5|140,20,#05f0b5|140,30,#05f0b5|140,40,#05f0b5|150,40,#05f0b5|160,40,#05f0b5|170,40,#05f0b5|170,50,#05f0b5|170,60,#05f0b5|160,60,#05f0b5|150,60,#05f0b5|140,60,#05f0b5|190,20,#05f0b5|200,20,#05f0b5|210,20,#05f0b5|220,20,#05f0b5|230,20,#05f0b5|210,30,#05f0b5|210,40,#05f0b5|210,50,#05f0b5|210,60,#05f0b5|230,60,#ffffff|250,60,#ffffff|270,60,#ffffff|290,60,#ffffff";
    let initialCoords = localStorage.getItem("Output") || demo;
    if (initialCoords.length > 18) {
      this.importCoords(initialCoords);
    }

    if (this.drawing) {
      this.draw();
      this.moveMainRectangle();
    }
  },
  computed: {
    exportCoords: function() {
      let coords = this.rectangles
        .map(({ x, y, color }) => `${x},${y},${color}|`) //
        .join("");
      let outputCoords = coords.slice(0, -1);
      let outputSettings = `${this.canvas.canvasWidth}:${this.canvas.canvasHeight}:${this.canvas.tileSize}/`;
      return outputSettings + outputCoords;
    }
  },
  methods: {
    handleResize() {
      this.window.width = document.body.clientWidth;
      this.window.height = document.body.clientHeight;
    },
    async setCanvasSizeByDevice() {
      await this.setCanvasSize();
      this.draw();
    },
    setCanvasSize() {
      if (this.window.width < 1800 && this.window.width > 1300) {
        this.canvas.canvasWidth = 1200;
      } else if (this.window.width < 1300 && this.window.width > 1100) {
        this.canvas.canvasWidth = 1000;
      } else if (this.window.width < 1100 && this.window.width > 900) {
        this.canvas.canvasWidth = 800;
      } else if (this.window.width < 900 && this.window.width > 700) {
        this.canvas.canvasWidth = 600;
      } else if (this.window.width < 700 && this.window.width > 500) {
        this.canvas.canvasWidth = 400;
      }

      if (this.window.height < 1000 && this.window.height > 850) {
        this.canvas.canvasHeight = 500;
      } else if (this.window.height < 850 && this.window.height > 800) {
        this.canvas.canvasHeight = 450;
      } else if (this.window.height < 800 && this.window.height > 750) {
        this.canvas.canvasHeight = 420;
      } else if (this.window.height < 750 && this.window.height > 680) {
        this.canvas.canvasHeight = 350;
      } else if (this.window.height < 680 && this.window.height > 500) {
        this.canvas.canvasHeight = 300;
      }
    },
    updateCanvasSize() {
      this.canvas.numberOfTilesX =
        this.canvas.canvasWidth / this.canvas.tileSize;
      this.canvas.numberOfTilesY =
        this.canvas.canvasHeight / this.canvas.tileSize;
    },
    rectangle(color, x, y, w, h) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, w, h);
    },
    async importCoords(data) {

      let inputRegEx = /^\d+:\d+:\d+(\/).+$/;
      if (!inputRegEx.test(data)) {
        alert("Input must be: width:height:tile/x,y,color|.. \n e.g.: 1200:500:10/590,80,#F24405|590,90,#058af0|590,100,#05f034|590,110,#b4a713") 
        return;
      }

      this.rectangles = [];

      await this.editCanvasSize([
        Number(this.processData(data).SettingsArray[0]),
        Number(this.processData(data).SettingsArray[1])
      ]);
      await this.redrawTileSize(
        Number(this.processData(data).SettingsArray[2])
      );
      this.drawGrid();
      this.placeToLocation(data);
      this.rectangles = this.processData(data).coords;
      this.drawAllRectangles();
    },
    processData(data) {
      let allInput = data.split("/"); // => [SettingsArray] a [CoordsArray]
      let SettingsArray = allInput[0].split(":"); // => [CanvasWidth, CanvasHeight, TileSize]
      let CoordsArray = allInput[1].split("|"); // => [X, Y, Color]

      let CoordsArraySplit = CoordsArray.map(a => a.split(","));
      let coords = [];
      CoordsArraySplit.map(
        a => coords.push({ x: Number(a[0]), y: Number(a[1]), color: a[2] }) //
      );

      return {
        SettingsArray,
        coords
      };
    },
    placeToLocation(data) {
      let lastElementOfArray = this.processData(data).coords.slice(-1)[0];
      let penultimateElementOfArray = this.processData(data).coords.slice(
        -2
      )[0];

      let setCoords = [];

      //smernice X

      if (lastElementOfArray.x - penultimateElementOfArray.x > 0) {
        setCoords[0] = lastElementOfArray.x + this.canvas.tileSize;
      } else if (lastElementOfArray.x - penultimateElementOfArray.x < 0) {
        setCoords[0] = lastElementOfArray.x - this.canvas.tileSize;
      } else if (lastElementOfArray.x - penultimateElementOfArray.x == 0) {
        setCoords[0] = lastElementOfArray.x;
      }

      //smernice Y

      if (lastElementOfArray.y - penultimateElementOfArray.y > 0) {
        setCoords[1] = lastElementOfArray.y + this.canvas.tileSize;
      } else if (lastElementOfArray.y - penultimateElementOfArray.y < 0) {
        setCoords[1] = lastElementOfArray.y - this.canvas.tileSize;
      } else if (lastElementOfArray.y - penultimateElementOfArray.y == 0) {
        setCoords[1] = lastElementOfArray.y;
      }

      /* console.log(setCoords); */

      this.mainRectangle.x = setCoords[0];
      this.mainRectangle.y = setCoords[1];

      this.drawMainRectangle();
    },
    async editCanvasSize(action) {
      if (action == "magnifyW") {
        this.canvas.canvasWidth =
          this.canvas.canvasWidth + this.canvas.tileSize;
      } else if (action == "shrinkW") {
        this.canvas.canvasWidth =
          this.canvas.canvasWidth - this.canvas.tileSize;
      } else if (action == "magnifyH") {
        this.canvas.canvasHeight =
          this.canvas.canvasHeight + this.canvas.tileSize;
      } else if (action == "shrinkH") {
        this.canvas.canvasHeight =
          this.canvas.canvasHeight - this.canvas.tileSize;
      } else {
        this.canvas.canvasWidth = action[0];
        this.canvas.canvasHeight = action[1];
      }

      await this.updateCanvasSize();
      this.draw();
    },
    editTileSize(action) {
      if (this.infoBox) {
        if (window.confirm("This action removes all drawn rectangles !")) {
          this.infoBox = false;
          this.redrawTileSize(action);
        }
      } else {
        this.redrawTileSize(action);
      }
    },
    findAppropriateNumber(action) {
      let number = this.canvas.tileSize;

      if (action == "plus") {
        if (number < this.canvas.canvasHeight) {
          number++;
          if (
            this.canvas.canvasWidth % number == 0 &&
            this.canvas.canvasHeight % number == 0
          ) {
            this.canvas.tileSize = number;
          } else {
            this.canvas.tileSize = number;
            this.findAppropriateNumber("plus");
          }
        } else {
          console.log("Maximální velikost dosažena");
        }
      } else if (action == "minus") {
        if (number > 5) {
          number--;
          if (
            this.canvas.canvasWidth % number == 0 &&
            this.canvas.canvasHeight % number == 0
          ) {
            this.canvas.tileSize = number;
          } else {
            this.canvas.tileSize = number;
            this.findAppropriateNumber("minus");
          }
        } else {
          console.log("Minimální velikost dosažena");
        }
      }
    },
    async redrawTileSize(action) {
      if (action == "magnify") {
        /* this.canvas.tileSize = this.canvas.tileSize + 5; */
        this.findAppropriateNumber("plus");
      } else if (action == "shrink") {
        /* this.canvas.tileSize = this.canvas.tileSize - 5; */
        this.findAppropriateNumber("minus");
      } else {
        if (isNaN(action)) {
          console.log(`${action} is not number`);
        } else {
          this.canvas.tileSize = action;
        }
      }
      await this.updateCanvasSize();
      this.rectangle(
        "#424950",
        0,
        0,
        this.canvas.canvasWidth,
        this.canvas.canvasHeight
      );
      this.mainRectangle.x = 0;
      this.mainRectangle.y = 0;
      this.deleteAll();
      this.draw();
    },
    deleteAll() {
      this.rectangles = [];
      this.drawGrid();
      this.draw();
    },
    draw() {
      this.drawGrid();
      this.drawMainRectangle();
      this.drawAllRectangles();
    },
    drawGrid() {
      for (let i = 0; i < this.canvas.numberOfTilesX; i++) {
        for (let j = 0; j < this.canvas.numberOfTilesY; j++) {
          this.rectangle(
            this.canvas.color,
            this.canvas.tileSize * i,
            this.canvas.tileSize * j,
            this.canvas.tileSize - 1,
            this.canvas.tileSize - 1
          );
        }
      }
    },
    drawMainRectangle() {
      this.rectangle(
        this.mainRectangle.color,
        this.mainRectangle.x,
        this.mainRectangle.y,
        this.canvas.tileSize - 1,
        this.canvas.tileSize - 1
      );
    },
    getCoords() {
      let coords = this.rectangles.find(
        element =>
          element.x == this.mainRectangle.x && element.y == this.mainRectangle.y
      );
      return coords;
    },
    removeRectangle() {
      let index = this.rectangles.indexOf(this.getCoords());
      this.rectangles.splice(index, 1);
      this.draw();
    },
    add() {
      if (this.drawing) {
        if (this.rectangles.indexOf(this.getCoords()) == -1) {
          this.rectangles.push({
            x: this.mainRectangle.x,
            y: this.mainRectangle.y,
            color: this.mainRectangle.color
          });
        } else {
          console.log("duplicate");
        }
      }
    },
    moveMainRectangle() {
      window.addEventListener("keydown", e => {
        switch (e.key) {
          case "ArrowUp":
          case "Up":
            this.mainRectangle.y -= this.canvas.tileSize;
            break;
          case "ArrowDown":
          case "Down":
            this.mainRectangle.y += this.canvas.tileSize;
            break;
          case "ArrowLeft":
          case "Left":
            this.mainRectangle.x -= this.canvas.tileSize;
            break;
          case "ArrowRight":
          case "Right":
            this.mainRectangle.x += this.canvas.tileSize;
            break;
          case "r":
            if (this.drawing) {
              this.removeRectangle();
            }
            break;
          case "d":
          case "D":
            if (this.drawing) {
              this.restore = this.exportCoords; // obnoveni vymazaneho
              this.deleted = true;
              this.deleteAll();
            }
            break;
          case "p":
          case "P":
            if (this.rectangles.length > 0 && this.drawing) {
              this.play();
            }
            break;
          case "e":
          case "E":
            if (this.drawing == false) {
              this.edit();
            }
            break;
          case "Shift":
            this.add();
            this.deleted = false;
            this.copyText = "COPY OUTPUT";
            /* this.setItemToStorage(this.exportCoords); */
            break;
        }

        if (e.shiftKey) {
          switch (e.key) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
            case "Up":
            case "Down":
            case "Left":
            case "Right":
              this.add();
              break;
          }
        }

        this.checkDistanceLimits();

        if (this.drawing) {
          this.draw();
        }
      });
    },
    checkDistanceLimits() {
      let distanceX = this.canvas.tileSize * (this.canvas.numberOfTilesX - 1);
      let distanceY = this.canvas.tileSize * (this.canvas.numberOfTilesY - 1);

      if (this.mainRectangle.x < 0) {
        this.mainRectangle.x = distanceX;
      }
      if (this.mainRectangle.x > distanceX) {
        this.mainRectangle.x = 0;
      }
      if (this.mainRectangle.y < 0) {
        this.mainRectangle.y = distanceY;
      }
      if (this.mainRectangle.y > distanceY) {
        this.mainRectangle.y = 0;
      }
    },
    drawAllRectangles() {
      this.rectangles.forEach(eachRect => {
        this.rectangle(
          eachRect.color,
          eachRect.x + 1,
          eachRect.y + 1,
          this.canvas.tileSize - 3,
          this.canvas.tileSize - 3
        );
      });
    },
    play() {
      this.drawing = false;
      this.drawGrid();

      for (let [index, rect] of this.rectangles.entries()) {
        setTimeout(() => {
          this.rectangle(
            rect.color,
            rect.x + 1,
            rect.y + 1,
            this.canvas.tileSize - 3,
            this.canvas.tileSize - 3
          );
        }, this.drawingSpeed * index);
      }
    },
    edit() {
      this.drawing = true;
      this.draw();
    },
    changeColor(e) {
      this.mainRectangle.color = e.target.value;
      this.draw(); 
    },
    restoreCoords() {
      this.deleted = false;
      this.importCoords(this.restore);
    },
    setItemToStorage(value) {
      localStorage.setItem("Output", value);
    },
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY      
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
      this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    },
    insertImage(e) {
      let url = e.target['image'].value;
      this.image.url = url;
    },
  }
};
</script>

<style scoped>

textarea {
  width: 1000px;
  background: #343a40;
  color: white;
}

#Coords {
  width: 1000px;
  word-wrap: break-word;
  margin: auto;
}

.outer-btn {
  border-radius: 0.25rem 0 0 0.25rem;
  margin-right: 0 !important;
}

.inner-btn {
  padding: 0rem 0.4rem;
}

.btn-container {
  display: inline-block;
  background: #50555a;
  padding: 0.375rem 0.75rem;
}

.btn-end {
  border-radius: 0 0.25rem 0.25rem 0;
}

.btn-insert {
  padding: 0 0.75rem;
}

.btn-color {
  width: 1.5em;
  height: 1.5em;
}

.input-sizeing {
  width: 3.2em;
  height: 1.5em;
}

.input-coords {
  width: 10em;
  height: 1.5em;
}

.table thead th {
  border-bottom: 1px solid #dee2e6;
}

.activeSettings {
  background-color: #dc2626;
}
</style>
