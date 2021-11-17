<template>
  <div id="page">
    <canvas
      ref="canvasDrawing"
      :width="canvas.canvasWidth"
      :height="canvas.canvasHeight"
    ></canvas>
    <br />
    <table
      class="table mx-auto"
      :style="{ maxWidth: canvas.canvasWidth + 'px' }"
    >
      <thead>
        <tr>
          <th v-if="drawing" scope="col">
            <button class="btn btn-dark mx-1">← ↕ →</button>MOVE
            <button @click="add()" class="btn btn-dark">Shift</button> ADD
            <button
              v-if="restore.length > 18 && deleted"
              @click="restoreCoords()"
              class="btn btn-success"
            >
              BACK
            </button>
          </th>
          <th v-if="rectangles.length > 0 && drawing" scope="col">
            <button @click="removeRectangle()" class="btn btn-dark">R</button>
            REMOVE
          </th>
          <th v-if="rectangles.length > 0 && drawing" scope="col">
            <button
              @click="
                restore = exportCoords;
                deleted = true;
                deleteAll();
              "
              class="btn btn-dark"
            >
              D
            </button>
            DELETE ALL
          </th>
          <th v-if="rectangles.length > 0 && drawing" scope="col">
            <button @click="play()" class="btn btn-dark">P</button> PLAY
          </th>
          <th v-if="drawing == false" scope="col">
            <button @click="edit()" class="btn btn-dark">E</button> EDIT
          </th>
        </tr>
      </thead>
    </table>

    <div class="container mb-3">
      <div class="row">
        <div class="col-4 d-flex justify-content-start align-items-center">
          <color-picker
            v-model="colorPick"
            @input="onColorSelect"
            :step="1"
          ></color-picker>
        </div>

        <div class="col">
          <div class="row">
            <div>
              <button
                @click="showCanvasSetings = !showCanvasSetings"
                class="btn btn-dark m-1 outer-btn"
              >
                CANVAS SETTINGS
              </button>
              <div v-if="showCanvasSetings" class="btn-container">
                WIDTH:
                <button
                  @click="editCanvasSize('shrinkW')"
                  class="btn btn-dark mx-2 inner-btn"
                >
                  -
                </button>
                <form class="d-inline">
                  <input
                    v-model="canvas.canvasWidth"
                    class="input-sizeing"
                    type="text"
                    style="width: 3em"
                    disabled
                  />
                </form>
                <button
                  @click="editCanvasSize('magnifyW')"
                  class="btn btn-dark mx-2 inner-btn"
                >
                  +
                </button>
              </div>

              <div v-if="showCanvasSetings" class="btn-container">
                <span style="color: #ffffff">HEIGHT:</span>
                <button
                  @click="editCanvasSize('shrinkH')"
                  class="btn btn-dark mx-2 inner-btn"
                >
                  -
                </button>
                <form class="d-inline">
                  <input
                    v-model="canvas.canvasHeight"
                    class="input-sizeing"
                    type="text"
                    style="width: 3em"
                    disabled
                  />
                </form>
                <button
                  @click="editCanvasSize('magnifyH')"
                  class="btn btn-dark mx-2 inner-btn"
                >
                  +
                </button>
              </div>

              <div v-if="showCanvasSetings" class="btn-container btn-end">
                TILE:
                <button
                  @click="editTileSize('shrink')"
                  class="btn btn-dark mx-2 inner-btn"
                >
                  -
                </button>
                <form class="d-inline">
                  <input
                    v-model="canvas.tileSize"
                    class="input-sizeing"
                    type="text"
                    style="width: 3em"
                    disabled
                  />
                </form>
                <button
                  @click="editTileSize('magnify')"
                  class="btn btn-dark mx-2 inner-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div>
              <button
                @click="insertForm = !insertForm"
                class="btn btn-dark m-1 outer-btn"
              >
                INSERT COORDINATES
              </button>
              <div v-if="insertForm" class="btn-container btn-end">
                <form
                  class="d-inline"
                  @submit.prevent="importCoords(inputData)"
                >
                  <input
                    v-model="inputData"
                    type="text"
                    placeholder="Inser here"
                    class="input-coords "
                  />

                  <button class="btn btn-dark ml-2 btn-insert">INSERT</button>
                </form>
              </div>
              <button
                class="btn btn-danger mx-2 "
                v-if="rectangles.length > 0"
                v-clipboard="exportCoords"
              >
                COPY OUTPUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--     <div class="d-inline-block">
      <button
        @click="showColors = !showColors"
        class="btn btn-dark m-1 outer-btn"
      >
        CHANGE COLOR
      </button>
      <div v-if="showColors" class="btn-container btn-end">
        <button
          @click="changeColor('#F24405')"
          class="btn mx-1 inner-btn btn-color"
          style="background: #F24405;"
        ></button>
        <button
          @click="changeColor('#F29F05')"
          class="btn mx-1 inner-btn btn-color"
          style="background: #F29F05;"
        ></button>
        <button
          @click="changeColor('#524EBF')"
          class="btn mx-1 inner-btn btn-color"
          style="background: #524EBF;"
        ></button>
        <button
          @click="changeColor('#A094F2')"
          class="btn mx-1 inner-btn btn-color"
          style="background: #A094F2;"
        ></button>
        <button
          @click="changeColor('#F22E62')"
          class="btn mx-1 inner-btn btn-color"
          style="background: #F22E62;"
        ></button>
        <color-picker v-model="colorPick" @input="onColorSelect"></color-picker>

                <form
          class="d-inline"
          pattern="[a-fA-F\d]+"
          @submit.prevent="changeColor(hex)"
        >
          <input
            class="input-sizeing"
            v-model="hex"
            type="text"
            placeholder="#HEX"
          />
        </form> 
      </div>
    </div> -->

    <textarea
      disabled
      @change="console.log('zmena')"
      v-model="exportCoords"
      cols="30"
      rows="2"
      :style="{ width: canvas.canvasWidth + 'px' }"
    ></textarea>
    <br />
  </div>
</template>

<script>
/* import _ from "lodash-es"; */
import ColorPicker from "@radial-color-picker/vue-color-picker";
export default {
  components: { ColorPicker },
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
        color: "#F24405" //
      },
      colorPick: {
        hue: 50,
        saturation: 100,
        luminosity: 50,
        alpha: 1
      },
      rectangles: [],

      drawing: true,
      showColors: false,
      insertForm: false,
      showCanvasSetings: false,
      deleted: false,
      inputData: "",
      infoBox: true,
      restore: "",
      drawingSpeed: 10
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

    let initialCoords = localStorage.getItem("Output");
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
    onColorSelect() {
      //this.mainRectangle.color = `hsl(${this.colorPick}, 100%, 50%)`;
      this.mainRectangle.color = this.hslToHex(this.colorPick, 100, 50);
      this.draw();
      this.tabindex = 1;
    },
    hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    },
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
      this.deleted = false;
    },
    processData(data) {
      let allInput = data.split("/"); // => [SettingsArray] a [CoordsArray]
      let SettingsArray = allInput[0].split(":"); // => [CanvasWidth, CanvasHeight, TileSize]
      let CoordsArray = allInput[1].split("|"); // => [X, Y, Color]

      let CoordsArraySplit = CoordsArray.map(a => a.split(","));
      let coords = [];

      if (allInput[1].length > 3) {
        CoordsArraySplit.map(
          a => coords.push({ x: Number(a[0]), y: Number(a[1]), color: a[2] }) //
        );
      }

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

      if (lastElementOfArray) {
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
      } else {
        setCoords[0] = 0;
        setCoords[1] = 0;
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
          /* console.log(rect, index); */
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
    changeColor(color) {
      this.mainRectangle.color = color;
      this.draw();
    },
    restoreCoords() {
      this.deleted = false;
      this.importCoords(this.restore);
    },
    setItemToStorage(value) {
      localStorage.setItem("Output", value);
    }
  }
};
</script>

<style lang="scss" scoped>
#page {
  background: #424950;
}
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
</style>
